const express = require("express"); //подключаем экспресс
const morgan = require("morgan"); // логирует htttp статус поступают ли какие нить запросы
const path = require("path");//подключаем паф
const hbs = require("hbs");//подключаем хбс
const { Console } = require("console");
const PORT = 3000;
const app = express();




app.set("view engine", "hbs"); //подключаем движ
app.set("views", path.join(process.env.PWD, "views"));
hbs.registerPartials(path.join(process.env.PWD, "views", "partials"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, "public")));



//ручка главная страница
app.get("/", (req, res) => {
  res.render("index");
});


//ручка на страницу регистрации
app.get("/signup", (req, res) => {
  res.render("signup");
});






// ручка на вход
app.get("/signin", (req, res) => {
  res.render("signin");
});











// ручка на мои посты 

app.get("/userpost", (req, res) => {
  res.render("userpost");
});


// ручка на все посты приложения

app.get("", (req, res) => {
  res.render("");
});


// ручка на добавить пост 

app.get("/addpost", (req, res) => {
  res.render("addpost");
});








//ручка на добавление выхода

app.get("/logout", (req, res) => {
  res.render("index");
});





 




app.listen(PORT, () => {
console.log("Порт запущен на порту PORT");
});
