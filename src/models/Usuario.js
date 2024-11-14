const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6,
    select: false
  },
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'El servicio es requerido']
  },
  rol: {
    type: String,
    enum: ['MEDICO', 'JEFE_SERVICIO', 'ADMIN'],
    default: 'MEDICO'
  },
  activo: {
    type: Boolean,
    default: true
  },
  ultimoAcceso: Date
}, {
  timestamps: true
});

// Encriptar password antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar passwords
usuarioSchema.methods.compararPassword = async function(passwordCandidata) {
  return await bcrypt.compare(passwordCandidata, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;