import { pluralize } from 'mongoose';
import { Player } from '../players/playerModel'
import { ObjectId } from 'mongodb'
import { Game } from '../games/gameModel'


export default class PlayersService {

    static async addPlayer(playerId: ObjectId, _name: string, _password: string, _mail: string) {
        const player = await Player.findById(playerId);

        if (player) {

            throw new Error('The player with this id already exists.');
        }
        const newPlayer = new Player({
            _id: playerId,
            name: _name,
            password: _password,
            email: _mail,

        });
        await newPlayer.save();
        return newPlayer;

    }

    static async deletePlayer(playerId: string) {
        const player = await Player.findById(playerId);
        if (!player) {
            throw new Error('The Player is not found.');
        }
        await Player.deleteOne({ _id: playerId });

        return player;
    }

  static async updatePlayer(playerId: string, password: string, _name: string = "", _newPassword: string = "", _email: string = "") {
  const player = await Player.findById(playerId);
  if (!player) {
    throw new Error('The Player is not found.');
  }

  if (player.password !== password) {
    throw new Error('The Password is wrong.');
  }

  if (_name) player.name = _name;
  if (_email) player.email = _email;
  if (_newPassword) player.password = _newPassword;

  await player.save();
  return player.toJSON();
}


    static async displayPlayer(playerId: string) {
        const player = await Player.findById(playerId).lean();
        if (!player) {
            throw new Error('The Player is not found.');
        }
    
        const games = await Game.find({ _id: { $in: player.gamesIds } }).lean();
    
        return {
            ...player,
            games,
        };
    }

    static async lastGameForPlayer(playerId: string) {
        const player = await Player.findById(playerId);
        if (!player) {
            throw new Error('The Player is not found.');
        }
        const game = (Game.findById(player.gamesIds[player.gamesIds.length - 1]));
        return game;
    }
static async getLeaderboard() {
  const games = await Game.find({ winner: true }).lean();
  games.sort((a, b) => a.attempts.length - b.attempts.length);
  const top10Games = games.slice(0, 10);
  const players = await Promise.all(
    top10Games.map(async (game) => {
      const player = await Player.findById(game.playerId).lean();
        if (!player) {
            throw new Error('Player not found for game: ' + game._id);
        }
      return {
        gameId: game._id,
        playerName: player.name,
        attempts: game.attempts.length,
      };
    })
  );

  return players;
}


}



