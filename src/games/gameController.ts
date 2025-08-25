import { Router, Request, Response } from 'express';
import gameService from './gameService';
import {validateGuess} from "../middlewares/validateGuess"


const router = Router();

router.post('/start', async (req: Request, res: Response) => {
  const {playerId, password} = req.body;
  const game_id = await gameService.createNewGame(playerId, password);
  
  res.status(201).send(game_id);
});

router.post('/:gameId/guess',validateGuess, async (req: Request, res: Response) => {
  const gameId=req.params.gameId
  const {guessNumbers} = req.body;
  const massage = await gameService.sendGuess(gameId, guessNumbers);
  res.status(201).json(massage);
});

router.get('/:gameId', async (req: Request, res: Response) => {
  const gameId=req.params.gameId

  const status = await gameService.getStatusGame(gameId);
  res.status(200).json(status);
});

router.post('/:gameId/end', async (req: Request, res: Response) => {
  const gameId=req.params.gameId
  const messege = await gameService.finishGame(gameId);
  res.status(201).send(messege);
});
export default router;
