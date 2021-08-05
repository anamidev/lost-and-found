const express = require('express');
const { User } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  // страница для логина
  // вместо res.send вставить res.render('login')
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // Проверка наличия пользователя в БД по email
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  // Если найден user, продолжаем проверку
  if (user) {
  // Если пароль совпал, создаём сессию, записываем информацию о пользователе, редиректим на профиль
    if (user.password === password) {
      req.session.userId = user.id;
      req.session.userName = user.name;
      req.session.userEmail = user.email;
      // Задать redirect на профиль
      // res.status(200).render(`/profile/${user.id}`);
      res.redirect(`/profile/${user.id}`);
    } else {
      // Password не совпал, надо что-то сообщить пользователю
      return res.render('login', { warningPassword: 'Неверный пароль', saveEmail: email.toLowerCase() });
    }
  } else {
    // Email не найден, надо что-то сообщить пользователю
    return res.render('login', { warningEmail: 'Такого email не существует' });
  }
});

module.exports = router;
