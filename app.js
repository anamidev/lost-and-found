// основные пакеты для работы приложения
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const multer = require('multer'); // мултер
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const layoutChanger = require("./middleware/commonMiddleware");

// логгер для чтения команд на сервере и путь
const morganLogger = require('morgan');
const path = require('path');

// импорт мидлверов
// const loginChecker = require('./middleware/loginChecker');

// импорт роутеров
const mainPageRouter = require('./routes/mainpage');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');
const claimsRouter = require('./routes/claims');
const categoryRouter = require('./routes/category');

const { layoutChanger } = require('./middleware/commonMiddleware');

// объявление приложения и указание порта
const app = express();
const PORT = 3001;

const storageConfig = multer.diskStorage({ // мултер
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
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
app.use(morganLogger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: storageConfig }).single('photo'));// мидлвара мултер
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

app.use(layoutChanger);

// использование роутеров под определенные адреса
app.use('/', mainPageRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/post', postRouter);
app.use('/claims', claimsRouter);
app.use('/category', categoryRouter);

app.listen(PORT, () => {
  console.log('Server is up!');
});
