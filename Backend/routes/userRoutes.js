const express = require('express');

const userControllers=require('../controllers/userController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const router=express.Router();




// http://localhost:5005/api/user/registeruser

router.post('/registeruser',upload.single('profileImage'), userControllers.register);


// http://localhost:5005/api/user/loginuser
router.post('/loginuser', userControllers.login);




// http://localhost:5005/api/user/getUserInfo
router.get('/getUserInfo', auth.authenticate ,userControllers.getProfile);




module.exports=router;