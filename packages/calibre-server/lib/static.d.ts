import { Request, Response, Handler, NextFunction } from 'express';
import { ServeStaticOptions } from 'serve-static';
export declare function disallowStatic(req: Request, res: Response, next: NextFunction): void;
export declare function staticExtra(root: string, options?: ServeStaticOptions): Handler[];
export default staticExtra;
