import PageTitle from '../../components/PageTitle';
import './index.css';

function About() {
  return (
    <div className="about">
      <PageTitle title="Про блог" />
      <div className="about__content">
        <p>
          Блог <strong>"Defence of Ukraine"</strong> - це платформа, де українці мають можливість
          поділитися своїми історіями та досвідом переживання війни, що триває в Україні. Тут ви
          знайдете історії про те, як люди виживають під обстрілами, як вони допомагають один
          одному, як змінилось їхнє життя після початку конфлікту.
        </p>
        <p>
          Якщо ви хочете <strong>поділитися своєю історією</strong>, або хочете дізнатися більше про
          те, як жити в умовах війни, то <strong>"Defence of Ukraine"</strong> - це місце для вас.
          Наша мета - створити спільноту людей, які розуміють один одного і можуть підтримати в
          складний час.
        </p>
        <p>
          <strong>Стати автором</strong> нашого блогу може кожен, хто має бажання поділитися своїми
          думками та враженнями про життя в умовах війни. Ми з нетерпінням чекаємо на ваші історії
          та досвід, які можуть допомогти іншим людям, які переживають подібне. Приєднуйтесь до нас,
          щоб ділитися та спілкуватися зі своїми співвітчизниками!
        </p>
      </div>
    </div>
  );
}

export default About;
