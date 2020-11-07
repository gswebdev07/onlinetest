const { JWT_token_decoded } = require("./token");
const dotenv = require("dotenv");
dotenv.config();

exports.adminPermission = (req, res, next) => {
  let token;
  // Token validation
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  )
    token = req.headers.authorization.split("Bearer ")[1];
  else return res.status(403).json({ error: "Access forbidden" });
  req.id = JWT_token_decoded(res, token)._id;

  // Admin validation
  if (req.id !== process.env.ADMIN_ID)
    return res.status(502).json({ error: "WARNING, server is under attack!" });
  next();
};

exports.protectedRoute = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  )
    token = req.headers.authorization.split("Bearer ")[1];
  else return res.status(403).json({ error: "Access forbidden" });
  req.id = JWT_token_decoded(res, token)._id;
  next();
};
