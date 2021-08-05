const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/', (req, res) => {
  // главная страница, на которой идет отрисовка всех постов из базы данных
  const allPosts = db.Post.findAll({
    attributes: ['id', 'title', 'description', 'photo'],
  });
  res.render('mainpage', { allPosts });
});

module.exports = router;
