import { validationResult } from 'express-validator';
import ArticleModel from '../models/Articles.js';
import UserModel from '../models/Authorized.js';

export const getAllArticles = async (req, res) => {
  const { sort } = req.query;
  const { search } = req.query;
  try {
    const allArticles = await ArticleModel.find(
      search
        ? {
            $or: [{ $text: { $search: search } }, { tags: { $in: [search] } }]
          }
        : {}
    )
      .populate('author')
      .sort({ [sort]: -1 })
      .exec();
    res.json(allArticles);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось знайти статті' });
  }
};

export const getMyArticles = async (req, res) => {
  const { userId } = req;
  try {
    const myArticles = await ArticleModel.find({ author: userId })
      .populate('author')
      .sort({ createdAt: -1 })
      .exec();
    res.json(myArticles);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось знайти статті' });
  }
};

export const getArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $inc: { viewsCount: 1 }
      },
      {
        returnDocument: 'after'
      }
    )
      .populate('author')
      .exec();
    const articleWithoutAuthor = {
      ...article.toObject(),
      author: { ...article.author.toObject(), passwordHash: undefined }
    };
    res.json(articleWithoutAuthor);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось знайти статтю' });
  }
};

export const postArticle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }

    const doc = new ArticleModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId
    });
    const article = await doc.save();

    await UserModel.findByIdAndUpdate(req.userId, { $inc: { userArticles: 1, rating: 1 } });

    res.json({ ...article._doc, message: 'Статтю опубліковано успішно' });
  } catch (err) {
    res.status(500).json({
      message: 'Розміщення статті пройшло не коректно. Можливо стаття з такою назвою вже існую.'
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    //check users permission to delete article
    const article = await ArticleModel.findById(articleId);
    if (String(article.author) !== req.userId) {
      return res.status(403).json({ message: 'Доступ відсутній' });
    }

    ArticleModel.findByIdAndDelete(articleId, (err, doc) => {
      if (err) {
        return res.status(500).json({ message: 'Не вдалось видалити статтю' });
      }
      if (!doc) {
        return res.status(404).json({ message: 'Не вдалось знайти статтю' });
      }
      res.json({ message: 'Статтю видалено успішно' });
    });
    await UserModel.findByIdAndUpdate(req.userId, { $inc: { userArticles: -1, rating: -1 } });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось видалити статтю' });
  }
};

export const patchArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    //check users permission to update article
    const article = await ArticleModel.findById(articleId);
    if (String(article.author) !== req.userId) {
      return res.status(403).json({ message: 'Доступ відсутній' });
    }

    await ArticleModel.findByIdAndUpdate(articleId, {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl
    });
    res.json({ _id: articleId, message: 'Статтю оновлено успішно' });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось оновити статтю' });
  }
};

export const getPopularTags = async (req, res) => {
  try {
    const allArticles = await ArticleModel.find().exec();
    const allTags = allArticles.reduce((tags, article) => [...tags, ...article.tags], []);
    //sort tags by popular ----------->
    const counter = {};
    allTags.forEach((item) => {
      if (item in counter) {
        counter[item]++;
      } else {
        counter[item] = 1;
      }
    });
    const sortedTags = Object.keys(counter).sort((a, b) => {
      return counter[b] - counter[a];
    });
    // <----------- sort tags by popular
    res.json(sortedTags.slice(0, 6));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось знайти статті' });
  }
};
