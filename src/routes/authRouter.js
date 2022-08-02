import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import signupValidation from '../middlewares/signupValidation.js';

const router = Router();

router.post('/signup', signupValidation, signUp);
router.post('/signin', signIn);

export default router;