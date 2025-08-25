import { Game, Guess } from './gameModel'
import { Player } from '../players/playerModel'
import { ObjectId } from 'mongodb'
import { generateSecretCode, win, bulls, pgias } from './gameLogic'

let gameIdCounter = 1;

export default class GamesService {

  static async createNewGame(playerId: string, password: string) {
    const player = await Player.findById(playerId); 
    if (!player) {
      throw new Error('The Player is not found.');
    }
    if (player.password !== password) {
      throw new Error('The Password is wrong.');
    }
    const secretCode = generateSecretCode();
    const newGame = new Game({
      _id: gameIdCounter++,
      playerId: playerId,
      secretCode: secretCode,
      attempts: [],
      status: 'in-progress',

    });
    await newGame.save();
console.log(newGame._id);
    player.gamesIds.push(newGame._id);
  

    await player.save();
  
  
    return newGame._id;
  }

  static async sendGuess(gameId: string, _guessNumbers: number[]) {
    const game = await Game.findById(gameId);
    if (!game) {
      throw new Error('The game is not found.');
    }
    if (game.status != 'in-progress') {
      throw new Error('The game is inactive.');
    }
    let messege;
    const guess = new Guess({
      guessNumbers: _guessNumbers,
      bulls: bulls(_guessNumbers, game.secretCode),
      pgias: pgias(_guessNumbers, game.secretCode)

    })
    if (win(guess.guessNumbers, game.secretCode)) {
      game.status = 'won';
      game.winner = true;
      const player = await Player.findById(game.playerId)
      if (player) {
        player.wins = player.wins + 1;
        player.save();
      }
      messege = "You won!!👏😍👏😍";
    }

    else if (game.attempts.length === game.maxAttempts - 1) {
      game.status='lost';
      game.winner=false;
      messege= 'The game is over, you have exhausted the number of possible attempts, good luck next time!!'
    }
    else{

    messege= `you have ${guess.bulls} bulls and ${guess.pgias}pgias try again!`
    }
    game.attempts.push(guess);
    game.save();
    return messege;
  }
 static async getStatusGame(gameId: string) {
  const game = await Game.findById(gameId).lean();
  if (!game) {
    throw new Error('The game is not found.');
  }

  return {
    status: game.status,
    attempts: game.attempts
  };
}
  static async finishGame(gameId: string){
    const game = await Game.findById(gameId);
    if (!game) {
      throw new Error('The game is not found.');
    }
    game.status='ended';
    game.save();
    return "the game ended "

  }





}







