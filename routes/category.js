const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const categoryPosts = await db.Post.findAll({ where: { categoryId: req.params.id } });
  const currentCategory = await db.Category.findOne({where : {id:req.params.id}})
  res.render("category", { categoryPosts, currentCategory: currentCategory.name });
});

module.exports = router;
