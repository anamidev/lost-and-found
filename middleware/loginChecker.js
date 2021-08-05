function loginChecker(req, res, next) {
  res.locals.userId = req.session.userId;
  res.locals.userName = req.session.userName;
  res.locals.userEmail = req.session.userEmail;
  next();
}

module.exports = loginChecker;
