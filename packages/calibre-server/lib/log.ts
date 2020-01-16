import { Console2 } from 'debug-color2';
import express, { Express, Request, Response, Router } from 'express';

export const console = new Console2(null, {
	chalkOptions: {
		enabled: true,
	},
	inspectOptions: {
		colors: true,
		depth: 5,
	},
	label: true,
	time: true,
});

console.setOptions({
	label: true,
	enabled: true,
});

export {
	console as consoleDebug,
}

export function logRequest(req: Request, res: Response)
{
	return [req.method, [req.baseUrl, req.url].join(''), req.query]
}

export default console
