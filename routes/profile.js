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

// router.get('/:id/delete', sessionChecker, async (req, res) => {
//   const { id } = req.params;
//   const currPost = await Post.findOne({ where: { id } });
//   console.log(currPost.userId);
//   if (req.session.userId === currPost.userId) {
//     await Post.destroy({ where: { id } });
//     res.redirect(`/profile/${req.session.userId}`);
//   } else {
//     res.redirect('/');
//   }
// });

module.exports = router;
