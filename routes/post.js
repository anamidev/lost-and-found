const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('postnew');
});

router.post('/new', async (req, res) => {
  // добавление поста в базу и переход на страницу этого поста
  const { category, title, description } = req.body;
  console.log(category, title, description);
  console.log(req.file);
  let photo = null;
  if (req.file) {
    photo = req.file.path.slice(6);
  }
  if (Number(category) === 0) {
    return res.render('postnew', { categoryCheckFail: true });
  }
  if (title === '' || title == null) {
    return res.render('postnew', { titleCheckFail: true });
  }
  await db.Post.create({
    title,
    description,
    categoryId: Number(category),
    userId: req.session.userId,
    photo,
  });
  res.redirect('/post/new');
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

// ручка для клейма в посте
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
