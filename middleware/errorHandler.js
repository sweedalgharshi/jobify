const { StatusCode } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong, try again later!",
  };
  res.status(defaultError.statusCode).json({ msg: err });
};

module.exports = errorHandlerMiddleware;
