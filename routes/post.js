const express = require('express');
const db = require('../db/models/index');
const { sessionChecker } = require('../middleware/commonMiddleware');

const router = express.Router();

router.get('/new', sessionChecker, (req, res) => {
  // отправка html с формой клиенту для отрисовки со стороны фронта через fetch
  res.render('postnew');
});

router.post('/new', async (req, res) => {
  // добавление поста в базу и переход на страницу этого поста
  const { category, title, description } = req.body;
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
  const newUserPost = await db.Post.create({
    title,
    description,
    categoryId: Number(category),
    userId: req.session.userId,
    photo,
  });

  const newUserMessage = await db.Message.create({
    userId: req.session.userId,
    text: 'Я нашел(-ла) это!',
    postId: newUserPost.id,
  });

  await db.Claim.create({
    postId: newUserPost.id,
    messageId: newUserMessage.id,
    userId: req.session.userId,
  });

  res.redirect(`/post/${newUserPost.id}`);
});

router.get('/:id', async (req, res) => {
  // отрисовка страницы поста с информацией о создателе и пользователях,
  // которые сделали claim
  const { id } = req.params;
  const post = await db.Post.findOne({
    raw: true,
    nest: true,
    where: { id },
    include: db.User,
  });
  const claimMess = await db.Claim.findAll({
    raw: true,
    nest: true,
    where: { postId: post.id },
    include: {
      model: db.Message,
      include: {
        model: db.User,
        required: true,
      },
    },
  });
  if (req.session.userId) {
    const userClaim = await db.Claim.findOne({ where: { userId: req.session.userId, postId: id }});
    if (userClaim) res.render('post', { post, alreadyClaimed: true, claimMess });
    else res.render('post', { post, claimMess });
  } else res.render('post', { post, claimMess });
  // проверка наличия сессии, через middleware
  // если сессия есть, то отображать кнопку claim
  // проверка, если текущий пользователь сделал claim на посту или нет
});

// ручка для клейма в посте
router.post('/:id', async (req, res) => {
  const { id: postId } = req.params;
  const { text } = req.body;
  const post = await db.Post.findOne({
    raw: true,
    nest: true,
    where: { id: postId },
    include: db.User,
  });
  const claimMess = await db.Claim.findAll({
    raw: true,
    nest: true,
    where: { postId: post.id },
    include: {
      model: db.Message,
      include: {
        model: db.User,
        required: true,
      },
    },
  });
  const userClaim = await db.Claim.findOne({ where: { userId: req.session.userId, postId }});
  if (userClaim) return res.render('post', { post, alreadyClaimed: true, claimMess });
  await db.Message.create({
    userId: req.session.userId,
    text,
    postId,
  });
  const messId = await db.Message.findOne({
    where: {
      userId: req.session.userId,
      postId,
    },
  });
  if (messId) {
    await db.Claim.create({
      postId,
      messageId: messId.id,
      userId: req.session.userId,
    });
    // res.render('post', { post, alreadyClaimed: true, claimMess });
    res.redirect(`/post/${postId}`);
  } else res.render('post', { post, claimFail: true, claimMess });
});

router.get('/:id/delete', sessionChecker, async (req, res) => {
  const { id } = req.params;
  const currPost = await db.Post.findOne({ where: { id } });
  if (req.session.userId === currPost.userId) {
    await db.Post.destroy({ where: { id } });
    res.redirect(`/profile/${req.session.userId}`);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
