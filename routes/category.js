const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const categoryPosts = await db.Post.findAll({ where: { categoryId: req.params.id } });
  res.render('category', { categoryPosts });
});

module.exports = router;
