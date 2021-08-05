const express = require('express');
const path = require('path');
const { User, Category, Post } = require('./db/models');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.render('userCreate');
// });

// app.post('/', async (req, res) => {
//   const { name, email, password } = req.body;
//   const user = await User.create({ name, email, password });
//   console.log(user);
//   res.redirect('/');
// });

// app.get('/', (req, res) => {
//   res.render('categoryCreate');
// });

// app.post('/', async (req, res) => {
//   const { name } = req.body;
//   const category = await Category.create({ name });
//   console.log(category);
//   res.redirect('/');
// });

// app.get('/', (req, res) => {
//   res.render('postCreate');
// });

// app.post('/', async (req, res) => {
//   const { title, description, photo } = req.body;
//   const post = await Post.create({ title, description, photo, userId: 1, categoryId: 3 });
//   console.log(req.body);
//   res.redirect('/');
// });

app.listen(80);
