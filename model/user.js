const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    passwordHash:String,
    verified:{
        type:Boolean,
        default:false
    },
    citas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cita'
    }]
});

userSchema.set('toJSON', {

    transform:(document,retunrObject) =>{

        retunrObject.id = retunrObject._id.toString();

        delete retunrObject._id;

        delete retunrObject.__v;
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;