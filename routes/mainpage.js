const express = require('express');
// const db = require('../db/models/index');

const router = express.Router();

router.get('/', (req, res) => {
  // главная страница, на которой идет отрисовка всех постов из базы данных
  // const allPosts = db.Post.findAll({
  // include: db.User
  // })
  // вместо res.send вставить res.render('mainpage')
  res.send('Main page');
});

module.exports = router;
