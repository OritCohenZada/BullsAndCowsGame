import { Request, Response, NextFunction } from "express";

export function validateGuess(req: Request, res: Response, next: NextFunction) {
    
  const{ guessNumbers} = req.body;

  if (!Array.isArray(guessNumbers) || guessNumbers.length !== 4|| !guessNumbers.every(n => typeof n === 'number')) {
res.status(400).json({ error: 'The guess must contain 4 numbers.' });
    return;
  }

  const uniqueNumbers = new Set(guessNumbers);
  if (uniqueNumbers.size !== guessNumbers.length) {
     res.status(400).json({ error: 'There must be no duplicate numbers in the guess.' });
     return ;
  }

  next();
}