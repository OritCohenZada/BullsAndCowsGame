import express, { Router, Request, Response } from 'express';
import playerService from './playerService';
import { validateGuess } from "../middlewares/validateGuess"
import { validatePlayer } from "../middlewares/validatePlayer"
import { Types , ObjectId} from 'mongoose';




const router = Router();
router.post('/add', validatePlayer, async (req: Request, res: Response) => {

  const { _id, name, password, email } = req.body;
  const player = await playerService.addPlayer(_id, name, password, email);
  res.status(201).json(player);
});
router.get('/:playerID', async (req: Request, res: Response) => {
  const playerID = req.params.playerID;
  const player:any = await playerService.displayPlayer(playerID);
  res.status(200).json(player);
})

router.delete('/:playerID', async (req: Request, res: Response) => {
  const playerID = req.params.playerID;
  const player = await playerService.deletePlayer(playerID);
  res.status(201).json(player);

});
router.put('/:playerID', validatePlayer, async (req: Request, res: Response) => {
  const playerID = req.params.playerID;
  const { password, name, newPassword, email } = req.body;
    const player = await playerService.updatePlayer(playerID, password, name, newPassword, email);
    res.status(201).json(player);

});

router.get('/:playerID/recent', async (req: Request, res: Response) => {
  const playerID = req.params.playerID;
  const lastGame = await playerService.lastGameForPlayer(playerID);
  res.status(200).json(lastGame);
})

router.get('/best/leaderboard', async (req: Request, res: Response) => {
  const leaderboard = await playerService.getLeaderboard();
  res.status(200).json(leaderboard);
})

export default router;                                                      