import { Router } from 'express';
import loginMiddlware from '../middlewares/loginMiddleware';
import LoginController from '../database/controllers/loginController';
// import validateToken from '../middlewares/validateToken';

const router = Router();

const loginController = new LoginController();

// router.get('/validate', validateToken, loginController.validate);
router.post('/', loginMiddlware, loginController.login);

export default router;
