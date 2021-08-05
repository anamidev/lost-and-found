const sessionChecker = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.redirect('/registration');
  }
};

const layoutChanger = (req, res, next) => {
  if (req.session) {
    res.locals.userName = req.session.userName;
    res.locals.userId = req.session.userId;
  }
  next();
};

module.exports = { sessionChecker, layoutChanger };
