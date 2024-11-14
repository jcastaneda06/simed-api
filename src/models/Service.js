// src/models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    jefe: {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
        },
        telefono: {
            type: String,
            required: true
        }
    },
    tipo: {
        type: String,
        required: true,
        enum: ['MEDICINA_INTERNA', 'CIRUGIA', 'PEDIATRIA', 'GINECOLOGIA', 'CARDIOLOGIA', 'NEUROLOGIA', 'TRAUMATOLOGIA', 'PSIQUIATRIA']
    },
    activo: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Service', serviceSchema);