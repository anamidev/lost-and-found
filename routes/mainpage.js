const express = require('express');
// const db = require('../db/models/index');

const router = express.Router();

router.get('/', (req, res) => {
  // главная страница, на которой идет отрисовка всех постов из базы данных
  // const allPosts = db.Post.findAll({
  // include: db.User
  // })
  res.render('mainpage');
});

module.exports = router;
