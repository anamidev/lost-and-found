const express = require('express');
const { Post } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  // главная страница, на которой идет отрисовка всех постов из базы данных
  const everyPost = await Post.findAll();
  res.render('mainpage', { everyPost });
});

module.exports = router;
