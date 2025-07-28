const { signup, login, getProfile } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.get('/me', authMiddleware, getProfile);

module.exports = router;