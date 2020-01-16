import express, { Express, Request, Response, Handler, NextFunction } from 'express';
import { ServeStaticOptions } from 'serve-static';
import { console, logRequest } from './log';

export function disallowStatic(req: Request, res: Response, next: NextFunction)
{
	if (/\.(?:json|js|db|ini|zip|rar)$/i.test(req.url))
	{
		console.warn(...logRequest(req, res));
		res.sendStatus(403);
	}
	else
	{
		next();
	}
}

export function staticExtra(root: string, options?: ServeStaticOptions): Handler[]
{
	return [disallowStatic, express.static(root, options)]
}

export default staticExtra
