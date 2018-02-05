module.exports = {
  logErrors: (err, req, res, next) => {
    console.log('*** SERVER ERROR ***');
    if (err.stack) {
      console.error(err.stack);
    } else {
      console.error(err);
    }
    next(err);
  },
  clientErrorHandler: (err, req, res, next) => {
    res.status(401).send({ err });
  }
};
