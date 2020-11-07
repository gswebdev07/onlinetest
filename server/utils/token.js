const jwt = require("jsonwebtoken");

const encryptionKey = "secret";

exports.JWT_token = (credentials) => {
  return jwt.sign(
    {
      _id: credentials._id,
    },
    encryptionKey
  );
};

exports.JWT_token_decoded = (res, token) => {
  return jwt.verify(token, encryptionKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Access forbidden." });
    return decoded;
  });
};
