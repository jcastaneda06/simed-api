const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const protegerRuta = async (req, res, next) => {
  try {
    // 1. Verificar si existe el token
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        exito: false,
        error: 'No está autorizado para acceder a este recurso'
      });
    }

    // 2. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Verificar si el usuario aún existe y está activo
    const usuario = await Usuario.findById(decoded.id).populate('servicio');
    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        exito: false,
        error: 'El usuario no existe o está desactivado'
      });
    }

    // 4. Agregar usuario a req
    req.usuario = usuario;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({
      exito: false,
      error: 'Token inválido o expirado'
    });
  }
};

const restringirA = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        exito: false,
        error: 'No tiene permisos para realizar esta acción'
      });
    }
    next();
  };
};

module.exports = { protegerRuta, restringirA };