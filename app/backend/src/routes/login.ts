import { Router } from 'express';
import loginMiddlware from '../middlewares/loginMiddleware';
import LoginController from '../database/controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.get('/', loginMiddlware, loginController.login);

export default router;
