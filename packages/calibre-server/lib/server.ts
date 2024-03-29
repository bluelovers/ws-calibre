import express, { Express, Request, Response } from 'express';
import favicon from 'serve-favicon';
import moment from './moment';
import Bluebird from 'bluebird';
import { IFindLibrarys, EnumDataFormatLowerCase } from 'calibre-db';
import { ITSResolvable } from 'ts-type';
import { array_unique } from 'array-hyper-unique';
import findLibrarys from 'calibre-db/lib/findLibrarys';
import { resolve } from "upath2";
import { hash_sha1 } from './crypto';
import loadLibrary from 'calibre-db/lib/loadLibrary';
import { DB } from 'calibre-db/lib/DB';
import { IFindLibrarysServer, IFaviconData, ISharedHandlerOptions } from './types';
import createHandler from './handler';
import { console, consoleDebug, logRequest } from './log';
import { NextFunction } from 'express-serve-static-core';
import helmet from 'helmet';
import staticExtra from './static';
import { name as pkgName, version as pkgVersion } from '../package.json';
import { parseFavicon, defaultFavicon } from './server/favicon';
import { ip as IPAddress } from 'address';
import qrcode from 'qrcode-terminal';
import searchIPAddress from 'address2';
import { AddressInfo } from "net";
import { defaultServerOptions, IServerOpotions } from './server/options';
import { buildLibraryList } from './db/buildList';
import { envCalibrePath } from 'calibre-env';
import { delimiter } from 'path';

export async function createServer(options: IServerOpotions)
{
	let {
		cwd,
		port,
		calibrePaths,
		pathPrefix = '',
		dbFilter,
		siteTitle = `Calibre 書庫 by ${pkgName}@${pkgVersion}`,
	} = options;

	port ||= defaultServerOptions().port;
	cwd = resolve(cwd);

	if (!calibrePaths?.length)
	{
		// @ts-ignore
		calibrePaths = envCalibrePath(process.env) ?? cwd;

		if (typeof calibrePaths === 'string')
		{
			// @ts-ignore
			calibrePaths = calibrePaths.split(delimiter);
		}
		else
		{
			// @ts-ignore
			calibrePaths = [calibrePaths];
		}

		calibrePaths = calibrePaths.flat().filter(v => Boolean(v) && v !== 'undefined' && v !== 'null');
	}

	const pathWithPrefix = (a = '', ...input) => [pathPrefix, a, ...input].join('/');

	console.info(`處理伺服器設定中`);

	const app = express();

	app.use(helmet());
	let localStatic = resolve(__dirname, '..', 'static');

	let staticPath = resolve(options.staticPath || localStatic);

	app.set('trust proxy', 1);

	app.use(favicon(parseFavicon(options.favicon) || defaultFavicon(staticPath, localStatic)));
	app.use('/static', express.static(staticPath));

	let dbList = await buildLibraryList({
		calibrePaths,
		dbFilter,
		cwd,
	});

	if (!Object.keys(dbList).length)
	{
		let err = `無法在目標路徑內找到任何 Calibre metadata.db 資料庫`;
		console.error(err);
		return Bluebird.reject(new Error(err));
	}

	Object.entries(dbList)
		.forEach(([id, row]) =>
		{
			let p = pathWithPrefix(id);

			app.use(`${p}`, staticExtra(row._fulldir, {
				extensions: [EnumDataFormatLowerCase.EPUB, 'cb7', 'cba', 'cbr', 'cbt', 'cbz'],
				index: false,
			}));
			console.debug(`[static]`, p, `=>`, row._fulldir);
		})
	;

	app.use((req: Request, res: Response, next: NextFunction) =>
	{
		console.debug(...logRequest(req, res));
		return next();
	});

	let sharedOptions: ISharedHandlerOptions = {
		app,
		port,
		pathWithPrefix,
		dbList,
		siteTitle,
	};

	app.use(createHandler(sharedOptions));

	let _app = app.listen(port, function ()
	{
		let address = _app.address() as AddressInfo;

		let ip: string = searchIPAddress();

		let href = `http://${ip}:${address.port}${pathWithPrefix()}`;

		qrcode.generate(href, { small: true });

		console.success(`伺服器成功啟動`);

		console.success(href);

		if (ip !== '127.0.0.1')
		{
			let ip = '127.0.0.1';
			href = `http://${ip}:${address.port}${pathWithPrefix()}`;
			console.success(href);
		}
	});

	return _app
}

export default createServer
