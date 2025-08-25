import express, { Request, Response }  from 'express';
import gamesRouter from './games/gameController';
import playersRouter from './players/playerController';
import {myDB} from './db/connection';
const app = express();
app.use(express.json());
myDB.getDB();

app.use('/api/players', playersRouter);
app.use('/api/games', gamesRouter);

app.use((err: Error, req: Request , res: Response, next: any) => {
    res.status(500).send(err.message);
});

export default app;