const express = require('express');
const { Post } = require('../db/models');

const router = express.Router();

router.get('/:id',async (req, res) => {
  // проверка, какой пользователь заходит на страницу профиля
  // сделать проверку через req.session
  const { id } = req.params
  if (req.session.userId === Number(req.params.id)) {
    // рендерим страницу нужного пользователя
    // вместо res.send сделать res.render

  const everyPost = await Post.findAll({ where: { userId: id } });
  res.render("profile", { everyPost });
  } else {
    res.redirect('/');
  }
});






router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  await Post.destroy({ where: { id } });
  res.redirect(`/${req.session.UserId}`);
});

module.exports = router;
