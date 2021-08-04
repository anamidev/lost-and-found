const express = require('express');
const path = require('path');
const { User } = require('./db/models');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('1');
});

app.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.create({ name, email, password });
  console.log(user);
  res.redirect('/');
});

app.get('/post', (req, res) => {
  res.render('1');
});

app.listen(80);
