const { UnAuthenticatedError } = require('../errors/index');

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) {
    return;
  } else {
    throw new UnAuthenticatedError(
      'Not Authorized to access this route'
    );
  }
};

module.exports = checkPermissions;
