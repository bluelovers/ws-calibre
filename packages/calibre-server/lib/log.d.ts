import { Console2 } from 'debug-color2';
import { Request, Response } from 'express';
export declare const console: Console2;
export { console as consoleDebug, };
export declare function logRequest(req: Request, res: Response): any[];
export default console;
