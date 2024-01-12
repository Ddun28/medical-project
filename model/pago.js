const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({

    Referencia:String,
    Cantidad:String,
    metodo:String,
    estado: {type: String,
        enum: ['En espera', 'Aprobado', 'Cancelado'],
        default: 'En espera'},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    citas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cita'
    }
});

pagoSchema.set('toJSON', {

    transform:(document, returnObject) =>{

        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
})

const Pago = mongoose.model('Pago', pagoSchema);
module.exports = Pago; 

