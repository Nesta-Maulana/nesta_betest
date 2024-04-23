const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: 401, message: "Anda Harus Login Terlebih Dahulu" });

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ error: 403, message: "Token sudah kedaluwarsa" });
      } else {
        return res.status(403).json({ error: 403, message: "Token tidak valid" });
      }
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
