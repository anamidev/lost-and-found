const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/', (req, res) => {
  // страница регистрации
  res.render('registration');
});

router.post('/', async (req, res) => {
  // ручка регистрации с проверками имени, емайла, пароля
  const {
    name, email, password, passwordRepeat,
  } = req.body;

  if (name.length > 50 || name.length < 2) {
    return res.render('registration', { nameCheckFail: true });
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i;
  if (email.length > 255 || !emailRegex.test(email)) {
    return res.render('registration', { emailCheckFail: true });
  }
  const passwordRegex = /[\w!@#$%^&*_\-\+\=]{8,50}/;
  if (password.length < 8 || password.length > 50
    || !passwordRegex.test(password)) {
    return res.render('registration', { passwordCheckFail: true });
  }
  if (password !== passwordRepeat) {
    return res.render('registration', { doublePasswordCheckFail: true });
  }

  const user = await db.User.findOne({
    where: { email: email.toLowerCase() },
  });
  if (user) {
    res.render('registration', { emailIsUsed: true });
  } else {
    await db.User.create({ name, email: email.toLowerCase(), password });
    res.render('registration', { registrationSuccess: true });
  }
});

module.exports = router;
