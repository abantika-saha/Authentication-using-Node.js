const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser=require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://abantika-saha:abantika@@node-auth.ma1h9.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
// app.listen(3000);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies
// app.get('/set-cookies', (req,res)=>{

//   // res.setHeader('Set-Cookie', 'newUser=true'); //name and value is true, used before installing cookieparser
//   res.cookie('newUser',false);
//   res.cookie('isEmployee',true, {maxAge: 100*60*60*24, secure: true}); //maxAge after which cookie expires, by default it expires after closing the browser is set only when it is secure connection that is https
//   res.cookie('isEmployee',true, {maxAge: 100*60*60*24, httpOnly: true}); //cannot access from javascript front can be transferred only via http protocol                                                   
//   res.send('You got the cookies');

// });

// app.get('/read-cookies', (req,res)=>{

//   const cookies = req.cookies;
//   console.log(cookies.newUser);
//   res.json(cookies);

// });