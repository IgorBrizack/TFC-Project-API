import { Router } from 'express';
import LeaderBoardController from '../database/controllers/leaderBoardController';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get('/', leaderBoardController.getHomeLeaderBoard);

export default router;
