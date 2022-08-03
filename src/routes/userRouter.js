import { Router } from 'express';
import { getUsersData } from '../controllers/userController.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();

router.get('/users/me', tokenValidation, getUsersData);

export default router;