// src/models/Interconsulta.js
const mongoose = require('mongoose');

// Primero definimos el esquema de nota
const notaSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true,
        trim: true
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Luego definimos el esquema principal de interconsulta
const interconsultaSchema = new mongoose.Schema({
    paciente: {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        edad: {
            type: Number,
            required: true
        },
        numeroHistoria: {
            type: String,
            required: true,
            unique: true
        }
    },
    servicioSolicitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    servicioDestino: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    objetivoConsulta: {
        type: String,
        required: true,
        trim: true
    },
    historiaClinica: {
        type: String,
        required: true,
        trim: true
    },
    estadoClinico: {
        subjetivo: {
            type: String,
            required: true,
            trim: true
        },
        signosVitales: {
            PresiónArterial: String,
            frecuenciaCardiaca: String,
            frecuenciaRespiratoria: String,
            temperatura: String,
            saturacionOxigeno: String
        }
    },
    laboratorios: {
        fechaUltimos: Date,
        resultados: {
            type: String,
            required: true,
            trim: true
        },
        observaciones: {
            type: String,
            trim: true
        }
    },
    imagenologia: {
        fecha: Date,
        tipo: String,
        descripcion: {
            type: String,
            required: true,
            trim: true
        },
        hallazgosRelevantes: {
            type: String,
            required: true,
            trim: true
        }
    },
    antecedentesPersonales: {
        type: String,
        required: true,
        trim: true
    },
    antecedentesFamiliares: {
        type: String,
        required: true,
        trim: true
    },
    alergias: {
        type: String,
        default: 'Ninguna conocida',
        trim: true
    },
    medicamentos: {
        preHospitalarios: {
            type: String,
            default: 'Ninguno',
            trim: true
        },
        hospitalarios: {
            type: String,
            default: 'Ninguno',
            trim: true
        }
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA'],
        default: 'PENDIENTE'
    },
    prioridad: {
        type: String,
        enum: ['BAJA', 'MEDIA', 'ALTA', 'URGENTE'],
        default: 'MEDIA'
    },
    notas: [notaSchema],
    notificaciones: [{
        mensaje: String,
        fecha: { type: Date, default: Date.now },
        leida: { type: Boolean, default: false }
    }],
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Índices para búsqueda eficiente
interconsultaSchema.index({ 'paciente.numeroHistoria': 1 });
interconsultaSchema.index({ estado: 1 });
interconsultaSchema.index({ prioridad: 1 });
interconsultaSchema.index({ fechaCreacion: -1 });

module.exports = mongoose.model('Interconsulta', interconsultaSchema);