import { Request, Response, Router } from 'express';
import { ISharedHandlerOptions } from './types';
import { NextFunction } from 'express-serve-static-core';
import { console } from './log';
import buildOPDSIndex from './opds/index';
import buildOPDSID from './opds/db';
import { ITSRequiredPick } from 'ts-type/lib/type/record';

export function createHandler(options: ITSRequiredPick<ISharedHandlerOptions, 'dbList' | 'pathWithPrefix' |'siteTitle'>)
{
	const { dbList } = options;

	const router = Router();

	console.dir(dbList);

	router.use('/+:dbID', async (req, res, next) =>
	{
		let { dbID } = req.params;

		if (dbID && dbList[dbID])
		{
			console.dir({
				dbID,
				name: dbList[dbID].name,
			});

			res.setHeader('Content-Type', 'application/xml');
			let feed = await buildOPDSID(options, { dbID });
			res.send(feed.toXML());
		}
		else
		{
			if (dbID)
			{
				console.error(`dbID: ${dbID} 不存在`);
			}

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
		return next();
	});

	return router
}

export default createHandler
