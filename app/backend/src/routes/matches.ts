import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../database/controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.bringAllMatches);
router.post('/', validateToken, matchesController.insertMatch);

export default router;
