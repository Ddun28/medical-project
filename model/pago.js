const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({

    Referencia:String,
    cantidad:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

