const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    
    Recipe:String,
    Indicaciones:String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    citas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cita'
    }
});

pdfSchema.set('toJSON', {

    transform:(document, returnObject) =>{

        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
})

const Pdf = mongoose.model('Pdf', pdfSchema);
module.exports = Pdf;