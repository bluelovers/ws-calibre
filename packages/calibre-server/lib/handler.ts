import { Request, Response, Router } from 'express';
import { ISharedHandlerOptions } from './types';
import { NextFunction } from 'express-serve-static-core';
import { console } from './log';
import buildOPDSIndex from './opds/index';
import buildOPDSID from './opds/db';

function createHandler(options: ISharedHandlerOptions)
{
	const { dbList } = options;

	const router = Router();

	console.dir(dbList);

	router.use('/+:dbID', async (req, res, next) =>
	{
		let { dbID } = req.params;

		console.dir({ dbID })

		if (dbID && dbList[dbID])
		{
			res.setHeader('Content-Type', 'application/xml');
			let feed = await buildOPDSID(options, { dbID });
			res.send(feed.toXML());
		}
		else
		{
			return next();
		}
	});

	let opdsIndex = (req: Request, res: Response, next: NextFunction) =>
	{
		res.setHeader('Content-Type', 'application/xml');
		res.send(buildOPDSIndex(options).toXML());
	};

	router.use('/opds(\.xml)?', opdsIndex);
	router.use('/', opdsIndex);

	router.use('*', (req: Request, res: Response, next: NextFunction) =>
	{

		console.dir(777);

		return next();
	});

	return router
}

export default createHandler
