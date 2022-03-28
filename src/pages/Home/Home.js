import React from 'react';

const Home = () => {
  return (
    <div className='container' style={{paddingBottom: '30px'}}>
      <h1 style={{textAlign: 'center'}}>Firebase. С 0 до PRO))))</h1>
      <h3>1. Authentication</h3>
      <ul>
        <li>Регистрация / логин с помощью емейла и пароля</li>
        <li>Logout</li>
        <li>Восстановление пароля</li>
        <li>Получение / редактирование данных текущего пользователя</li>
        <li>Верификация емейла</li>
        <li>Регистрация / логин с помощью гугл аккаунта</li>
        <li>Удаление аккаунта</li>
      </ul>
      <h3>2. Cloud Firestore & Storage</h3>
      <ul>
        <li>Firebase хуки</li>
        <li>Подключение к Firestore</li>
        <li>Подключение к Storage</li>
        <li>Добавление данных в коллекцию</li>
        <li>Загрузка файлов</li>
        <li>Получение данных</li>
        <li>Редактирование данных</li>
        <li>Удаление данных из Firestore / Storage</li>
        <li>Простой чат</li>
        <li>Бэкап</li>
        <li>Перенос базы данных в новый проект</li>
      </ul>
      <h3>3. Cloud Functions</h3>
      <ul>
        <li>Установка Firebase tools</li>
        <li>Инициализация функций</li>
        <li>Простейшие запросы get / post / patch / delete</li>
        <li>Продвинутые запросы</li>
        <li>Работа со Storage</li>
        <li>Scheduled Functions</li>
        <li>Deploy</li>
        <li>Health / Usage / Logs / Edit</li>
      </ul>
      <h3>4. Hosting</h3>
      <ul>
        <li>Настройка проекта</li>
        <li>Deploy (очень простой и быстрый)</li>
        <li>Deploy через Гитхаб</li>
        <li>Подключение домена</li>
        <li>Откат версий</li>
      </ul>
    </div>
  );
};

export default Home;
