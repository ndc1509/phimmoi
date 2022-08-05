const { HttpError } = require("../constants");
const AppError = require("../utils/AppError");

const logErrors = (err, req, res, next) => {
  console.log(err);
  if (err instanceof AppError === false)
    err = new AppError(HttpError.INTERNAL_SERVER_ERROR, "", err);
  // console.error("ERROR: " + err.name);
  // if (err.message) console.error("MESSAGE: " + err.message);
  // if (err.detail) console.info("DETAIL: " + err.detail.toString());
  // console.log(err.stack)
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.type.code).json({
    success: false,
    msg: `${err.name}:${err.message ? err.message : null}`,
    // detail: err.detail ? err.detail.toString() : ""
  });
};

module.exports = { logErrors, errorHandler };
