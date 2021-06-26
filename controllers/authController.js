const User = require("../models/User");

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code); //error code works only if the email not unique for most cases it is undefined
    let errors = { email: '', password: '' };

//duplicate error code
if(err.code === 11000){
    errors.email = 'The email is already registered';
    return errors;
}

    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) =>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
//to store handler func
module.exports.signup_get = (req,res) =>{
    res.render('signup');
}

module.exports.login_get = (req,res) =>{
    res.render('login');
}

module.exports.signup_post = async (req,res) =>{
    const {email, password} = req.body;
    
    try{
        const user = await User.create({email,password});
        res.status(201).json(user);        
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req,res) =>{
    // console.log(req.body);
    const {email, password} = req.body;
    console.log(email,password);
    res.send('user login');
}

