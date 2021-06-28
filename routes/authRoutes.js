//require routes from express package
const { Router } = require('express');
//import func controller
const authController = require('../controllers/authController');

//create new instance of router
const router = Router();

router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);

//export router to import in app.js 
module.exports=router;
