module.exports.authUser = (req, res, next) => {
  // Check if user authenticate
  if (!req.user) {
    return res.status(400).json({
      error: true,
      msg: "User need to be login!",
      data: {},
    });
  }
  next();
};

module.exports.authRole = (roleLevel) => {
  return (req, res, next) => {
    if (req.user.roleLevel < roleLevel) {
      return res.status(401).json({
        error: true,
        msg: "User don't have permission!",
        data: {},
      });
    }
    next();
  };
};
