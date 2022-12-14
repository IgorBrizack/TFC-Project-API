import { Router } from 'express';
import TeamsController from '../database/controllers/teamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getById);

export default router;
