const express = require('express');
const { User } = require('../db/models');
const sessionChecker = require("../middleware/commonMiddleware")

const router = express.Router();

router.get('/', (req, res) => {
  // страница для логина
  res.render('login');
});

router.post('/', async (req, res) => {
  // запрос для логина с проверкой пользователя в базе и совпадением пароля к нему
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (user) {
    if (user.password === password) {
      req.session.userId = user.id;
      req.session.userName = user.name;
      req.session.userEmail = user.email;
      res.redirect(`/profile/${user.id}`);
    } else {
      return res.render('login', { warningPassword: 'Неверный пароль', saveEmail: email.toLowerCase() });
    }
  } else {
    return res.render('login', { warningEmail: 'Такого email не существует' });
  }
});

module.exports = router;
