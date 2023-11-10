const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    verified:{
        type:Boolean,
        default:false
    }
})

userSchema.set('tpJSON', {

    transform:(document,retunrObject) =>{

        retunrObject.id = retunrObject._id.toString();

        delete retunrObject._id;

        delete retunrObject.__v;
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;