import { Router } from 'express';
import MatchesController from '../database/controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.bringAllMatches);

export default router;
