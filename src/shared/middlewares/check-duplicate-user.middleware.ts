import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DuplicateCheckingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {username, password} = req.body;
    
    next();
  }
}
