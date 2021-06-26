const mongoose=require('mongoose');
const { isEmail } = require('validator');

//scheme dictates how different objects and docs look in database
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,    //error if email already exist
        lowercase: true,  //converts into lower before saving to database
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
