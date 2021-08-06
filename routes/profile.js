const express = require('express');
const { Post } = require('../db/models');
const { sessionChecker } = require('../middleware/commonMiddleware');

const router = express.Router();

router.get('/:id', sessionChecker, async (req, res) => {
  // проверка, какой пользователь заходит на страницу профиля
  // сделать проверку через req.session
  const { id } = req.params;
  if (req.session.userId === Number(id)) {
    const everyPost = await Post.findAll({ where: { userId: req.session.userId } });
    // рендерим страницу нужного пользователя
    res.render('profile', { everyPost });
  } else {
    res.send('404');
  }
});

module.exports = router;
