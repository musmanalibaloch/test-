const express = require('express');
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();
const schemaValidator = require('../middleware/schemavalidator.middleware')
const {registerSchema} = require('../validators/userRegisteration.validator')

router.post('/register',schemaValidator(registerSchema), userController.register);
router.post('/login',authMiddleware, userController.login);
router.get('/health',(req,res)=> res.send('hellos'))
module.exports = router;
