const roleBasedAuth = (role) => (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role.includes(role)) return next();

  res.status(403).send("Access Denied!!");
};

export default roleBasedAuth;
