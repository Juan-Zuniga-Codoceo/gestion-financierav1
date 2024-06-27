const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('Acceso denegado. No se proporcionó un token.');
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Token inválido');
  }
};

module.exports = authMiddleware;
