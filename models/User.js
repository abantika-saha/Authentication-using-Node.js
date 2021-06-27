const mongoose=require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

//fire a dunction after new user has been saved to the database
userSchema.post('save', function(doc, next){
    console.log('New user was created and saved', doc);
    next(); //always do at the end of any mongoose middleware or hook
})

//fire a func before doc saved to db
userSchema.pre('save', async function(next){
    //this is used to get access of the object created before it is saved to db
    console.log('user about to be created and saved',this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt); //takes two arguements, password and salt
    next();
})

//static method to login user
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({ email });
    if(user){
        //hash this and compare it to the already hashed password in database
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}
const User = mongoose.model('user', userSchema);

module.exports = User;
