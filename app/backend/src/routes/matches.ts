import { Router } from 'express';
import teamsDifferentValidation from '../middlewares/teamsDifferentValidation';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../database/controllers/matchesController';
import validateTeamExist from '../middlewares/validateTeamExist';

const router = Router();

const matchesController = new MatchesController();

router.patch('/:id/finish', matchesController.updateMatch);
router.get('/', matchesController.bringAllMatches);
router.post(
  '/',
  validateToken,
  teamsDifferentValidation,
  validateTeamExist,
  matchesController.insertMatch,
);

export default router;
