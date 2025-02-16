import {Request, Response, NextFunction} from 'express';
import { HttpError } from 'http-errors';

export function ErrorMiddleware(err: HttpError, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).send(message);
}