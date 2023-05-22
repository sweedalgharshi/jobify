const jwt = require('jsonwebtoken');
const { UnAuthenticatedError } = require('../errors/index');

const auth = async (req, res, next) => {
  // console.log(req.cookies);
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new UnAuthenticatedError('Authentication Invalid');
  // }

  // const token = authHeader.split(' ')[1];

  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // TEST USER
    const testUser = payload.userId === '64670a4085381b8851bc356b';

    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

module.exports = auth;
