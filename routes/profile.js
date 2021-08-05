const express = require('express');
const { User } = require('../db/models');
const { sessionChecker } = require('../middleware/commonMiddleware');

const router = express.Router();

router.get('/:id', sessionChecker, async (req, res) => {
  // проверка, какой пользователь заходит на страницу профиля
  // сделать проверку через req.session
  if (req.session.userId === Number(req.params.id)) {
    const user = await User.findOne({ where: { id: req.session.userId } });
    const { name } = user;
    // рендерим страницу нужного пользователя
    // вместо res.send сделать res.render
    res.render('mainpage', { name });
  } else {
    res.send('404');
  }
});

module.exports = router;
