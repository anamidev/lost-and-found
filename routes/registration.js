const express = require('express');
const db = require('../db/models/index');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  // сделать проверку email'а
  // возможно, сделать проверку пароля (условие пароля)
  // сделать проверку двойного ввода пароля
  // сделать проверку, если поля пришли пустыми или нет
  // отправить статус ошибки и вывести сообщение об этом

  const user = await db.User.findOne({
    where: { email },
  });
  if (user) {
    // если нашли пользователя, отправляем статус ошибки
    res.status(409).send(); // 409 CONFLICT
  } else {
    // иначе создаем нового пользователя и отправляем статус успеха
    await db.User.create({ name, email, password });
    res.status(201).send(); // 201 CREATED
  }
});

module.exports = router;
