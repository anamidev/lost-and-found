const express = require('express');
const db = require('../db/models/index');
const { sessionChecker } = require('../middleware/commonMiddleware');

const router = express.Router();

router.get('/:id', sessionChecker, async (req, res) => {
  // проверка, какой пользователь заходит на страницу профиля
  // сделать проверку через req.session
  const { id } = req.params;
  if (req.session.userId === Number(id)) {
    const userClaims = await db.Claim.findAll({
      raw: true,
      nest: true,
      where: {
        userId: id,
      },
      include: [
        { model: db.Post },
        { model: db.Message },
      ],
    });
    res.render('claims', { userClaims });
  } else {
    res.send('404');
  }
});

module.exports = router;
