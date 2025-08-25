import { Request, Response, NextFunction } from "express";

function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPasswordStrong(password: string): boolean {

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return passwordRegex.test(password);
}

export function validatePlayer(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;
 
  if (
    typeof password !== 'string' ||
    password.length < 6 ||
    !isPasswordStrong(password)
  ) {
    res.status(400).json({ error: 'The password must contain at least 6 characters, an uppercase letter, a lowercase letter and a number.' });
    return;
  }
  if (typeof email !== 'string' || !isEmailValid(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }



  next();
}