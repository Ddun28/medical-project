const mongoose = require('mongoose');

const paypalSchema = new mongoose.Schema({

    id:String,
    status:String,
    email_address:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
});

paypalSchema.set('toJSON', {

    transform:(document, returnObject) =>{

        returnObject.id = returnObject._id.toString();

        delete returnObject._id;

        delete returnObject.__v;
    }
})

const Paypal = mongoose.model('Paypal', paypalSchema);
module.exports = Paypal; 

