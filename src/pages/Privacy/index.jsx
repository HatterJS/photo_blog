import './index.css';

function Privacy() {
  return (
    <div className="privacy">
      <div className="privacy__title">
        <div></div>
        <h1>Політика конфіденційності</h1>
        <div></div>
      </div>
      <div className="privacy__content">
        <h3>Політика конфіденційності</h3>
        <p>
          Цей документ містить інформацію про збір, використання та розкриття особистої інформації
          користувачів сайту <strong>"Defense of Ukraine"</strong>. Ми прагнемо забезпечити високий
          рівень захисту вашої приватності, дотримуючись вимог законодавства про захист персональних
          даних.
        </p>
        <h3>Збір та використання інформації</h3>
        <p>
          Ми збираємо особисту інформацію користувачів сайту лише з їх згоди, а також зібрану
          інформацію використовуємо лише з тими цілями, з якими вона була надана. Ми можемо збирати
          наступну інформацію:
        </p>
        <ul>
          <li>Ім'я та прізвище;</li>
          <li>Електронна адреса;</li>
          <li>Номер телефону;</li>
          <li>Інші дані, які ви надаєте добровільно.</li>
        </ul>
        <p>
          Ми використовуємо зібрану інформацію для забезпечення функціонування сайту та надання
          послуг, з якими пов'язаний сайт. Крім того, ми можемо використовувати інформацію для
          покращення якості послуг та для забезпечення безпеки нашого сайту.
        </p>
        <h3>Розкриття інформації третім особам</h3>
        <p>
          Ми не розкриваємо особисту інформацію користувачів сайту третім особам без їх згоди, за
          винятком випадків, передбачених законодавством. Ми можемо передавати інформацію третім
          особам лише в тому обсязі, який є необхідним для забезпечення послуг, з якими пов'язаний
          сайт.
        </p>
        <h3>Захист інформації</h3>
        <p>
          Ми прикладаємо всі необхідні заходи для захисту особистої інформації користувачів від
          несанкціонованого доступу, втрати, зміни чи поширення.
        </p>
        <p>
          {' '}
          Ми застосовуємо сучасні методи захисту інформації, включаючи наприклад, такі методи
          захисту інформації, як шифрування даних, захищені з'єднання і захист від вторгнень. Ми не
          розголошуємо особисту інформацію користувачів третім особам, якщо не отримали від них на
          це дозвіл. Крім того, наша політика конфіденційності періодично оновлюється з урахуванням
          сучасних вимог і стандартів.
        </p>
        <p>
          Якщо ви маєте які-небудь питання або пропозиції щодо нашої політики конфіденційності, будь
          ласка, зв'яжіться з нами за допомогою контактної інформації на нашому веб-сайті.
        </p>
      </div>
    </div>
  );
}

export default Privacy;