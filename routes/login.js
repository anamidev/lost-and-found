const e = require('express');
const express = require('express');
const { User } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
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
