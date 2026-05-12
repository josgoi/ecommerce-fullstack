const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    // Comprobamos si viene el token en los headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado, token requerido' });
    }

    // Extraemos el token (viene como "Bearer eltoken123")
    const token = authHeader.split(' ')[1];

    // Verificamos que el token es válido y no ha expirado
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscamos el usuario en la base de datos y lo añadimos al request
    req.user = await User.findById(decoded.id).select('-password');

    next(); // Pasamos al controlador
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso restringido a administradores' });
  }
};

module.exports = { protect, adminOnly };