module.exports = {
  logErrors: (err, req, res, next) => {
    console.error("log errors", err.stack);
    next(err);
  },
  clientErrorHandler: (err, req, res, next) => {
    res.status(401).send({ err });
  }
};
