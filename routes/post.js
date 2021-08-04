const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/new', (req, res) => {
  // отправка html с формой клиенту для отрисовки со стороны фронта через fetch
  res.render('postnew');
});

router.get('/:id', async (req, res) => {
  // отрисовка страницы поста с информацией о создателе и пользователях,
  // которые сделали claim
  const { id } = req.params;
  // const post = await db.Post.findOne({
    // where: { id },
    // include db.User
  // });
  // проверка наличия сессии, через middleware
  // если сессия есть, то отображать кнопку claim
  // проверка, если текущий пользователь сделал claim на посту или нет
  // const postClaimers = await db.Claim.findAll({
    // attributes: ['email'],
    // where: { post_id: id },
    // include db.User
  // });
  // if (postClaimers.includes(req.session.userEmail)) {
    // вместо res.send отправить json
    // res.send('отправляем объект для статуса кнопки, чтобы добавить ей класс для выключенной стилизации');
  // } else {
    // вместо res.send отправить json или статус ответа через res.status
    // res.cookie = { postId: id };
    res.render('post');
  // }
});

// router.post('/:id', async (req, res) => {
//   const { id } = req.params;
  // const claimedPost = await db.Claim.findOne({
  //   where: { claimer_id: req.session.userId },
  // });
  // if (claimedPost) {
    // вместо res.send отправить json или статус ответа через res.status
    // res.send('this post has already been claimed');
  // } else {
    // await db.Claim.create({ post_id: id, claimer_id: req.session.userId });
    // сделать запись, отправить статус успеха, возможно сделать редирект на страницу этого же поста
//     res.send('post has been claimed');
  // }
// });

module.exports = router;
