const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/:id', (req, res) => {
  // проверка, какой пользователь заходит на страницу профиля
  // сделать проверку через req.session
  if (req.session.userId === Number(req.params.id)) {
    // рендерим страницу нужного пользователя
    // вместо res.send сделать res.render
    res.send('profile page');
  } else {
    res.send('страница пользователя');
  }
});

module.exports = router;
