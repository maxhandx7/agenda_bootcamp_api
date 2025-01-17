const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // 'Bearer token'
  if (!token) {
    return res.status(401).json({ message: 'ACCESO DENEGADO' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar la información del usuario
    next();
  } catch (error) {
    res.status(400).json({ message: 'El token no es correcto' });
  }
};
