import { Router } from 'express';
import { shortenUrl, getUrlById, redirectUser } from '../controllers/urlController.js';
import urlValidation from '../middlewares/urlValidation.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();

router.post('/urls/shorten', tokenValidation, urlValidation, shortenUrl);
router.get('/urls/:id', getUrlById);
router.get('/urls/open/:shortUrl', redirectUser);

export default router;