const sessionLogger = (req, res, next) => {
  next();
};

const sessionChecker = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.redirect('/users/authorized');
  }
};

const layoutChanger = (req, res, next) => {
  res.locals.userName = req.session?.email;
  next();
};

module.exports = { sessionLogger, sessionChecker, layoutChanger };
