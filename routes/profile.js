const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/:id', async (req, res) => {
  // проверка, какой пользователь заходит на страницу профиля
  // сделать проверку через req.session
  if (req.session.userId === Number(req.params.id)) {
    // рендерим страницу нужного пользователя
    const user = await db.User.findOne({ where: { id: req.params.id } });
    const userPosts = await db.Post.findAll({ where: { userId: user.id } });
    res.render('profile', { user, userPosts });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
