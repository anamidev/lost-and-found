// основные пакеты для работы приложения
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const multer = require("multer"); //мултер

// логгер для чтения команд на сервере и путь
const morganLogger = require('morgan');
const path = require('path');

// импорт роутеров
const mainPageRouter = require('./routes/mainpage');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');

// объявление приложения и указание порта
const app = express();
const PORT = 3000;


const storageConfig = multer.diskStorage({ //мултер
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


// подключение движка отображения
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// мидлвер
// логгер, статик для файлов, декодинг тела формы, декодинг джсона, парсер куков,
// подключение сессии с использованием хранилища файлов сессий
app.use(express.urlencoded({ extended: true }));
app.use(morganLogger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: storageConfig }).single("photo"));//мидлвара мултер
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'alOjV68Hbs3zpL016FbsuGd5',
  resave: false,
  saveUninitialized: false,
  name: 'session',
  cookie: { secure: false, httpOnly: true },
  store: new FileStore({}),
}));

// использование роутеров под определенные адреса
app.use('/', mainPageRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log('Server is up!');
});
