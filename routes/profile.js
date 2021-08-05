const express = require('express');
const { User, Post } = require('../db/models');
const { sessionChecker } = require('../middleware/commonMiddleware');

const router = express.Router();

router.get('/:id', sessionChecker, async (req, res) => {
  // проверка, какой пользователь заходит на страницу профиля
  // сделать проверку через req.session
  const { id } = req.params;
  if (req.session.userId === Number(id)) {
    const user = await User.findOne({ where: { id: req.session.userId } });
    const { name } = user;
    const everyPost = await Post.findAll({ where: { userId: req.session.userId } });
    // рендерим страницу нужного пользователя
    res.render('profile', { everyPost });
  } else {
    res.send('404');
  }
});

router.get('/:id/delete', async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  await Post.destroy({ where: { id } });
  console.log(req.session.userId);
  res.redirect(`/profile/${req.session.userId}`);
});

module.exports = router;
