const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    Edad:String,
    Telefono:String,
    Cedula:String,
    Fecha: {
        type:Date
    },
    Hora:String,
    Sintomas:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    pagos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pago'
    }
});

citaSchema.set('toJSON', {

    transform:(document, returnObject) =>{

        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
})

const Cita = mongoose.model('Cita', citaSchema);
module.exports = Cita; 

