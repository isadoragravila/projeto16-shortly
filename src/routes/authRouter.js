import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import signupValidation from '../middlewares/signupValidation.js';
import signinValidation from '../middlewares/signinValidation.js';

const router = Router();

router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);

export default router;