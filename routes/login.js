const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/', (req, res) => {
  // страница для логина
  // вместо res.send вставить res.render('login')
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // проверка наличия такого пользователя - в данном случае email'а в базе
  const user = await db.User.findOne({
    where: { email },
  });
  // проверка совпадения введенного пароля с текущим паролем пользователя
  // если совпадает, заводим сессию и записываем информацию о пользователе
  if (user.password === password) {
    res.session.userId = user.id;
    res.session.userName = user.name;
    res.session.userEmail = user.email;
    res.status(200).render(`/profile/${user.id}`);
  } else {
    res.status().send();
  }
});

module.exports = router;
