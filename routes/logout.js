const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('session', '', { expire: 1 });
  res.clearCookie('session');
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
