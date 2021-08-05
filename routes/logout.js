const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // удаляем куки сессии, удаляем сессию и делаем редирект на главную
  res.cookie('session', '', { expire: 1 });
  res.clearCookie('session');
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
