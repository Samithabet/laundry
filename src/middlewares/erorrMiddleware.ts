import  {Request, Response, NextFunction} from 'express';
import { HttpError,NotFound } from 'http-errors';

export function ErrorMiddleware(err: HttpError, req: Request, res: Response, next: NextFunction) {    
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({status: status, message: message});
}
export function errorUrl(req: Request, res: Response, next: NextFunction) {

    const err= new NotFound(`can not find ${req.url}`);
    next(err);
}