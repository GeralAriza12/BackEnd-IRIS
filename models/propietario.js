const mongoose = require('mongoose');

const PropietarioSchema = new mongoose.Schema({
  tipoDocumento: {
    type: String,
    required: true
  },
  numeroDocumento: {
    type: String,
    required: true,
    unique: true
  },
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  correoElectronico: {
    type: String,
    required: true
  },
  celular: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Propietario', PropietarioSchema);
