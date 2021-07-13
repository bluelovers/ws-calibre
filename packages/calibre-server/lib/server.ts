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

export async function createServer(options: IServerOpotions)
{
	let { cwd, port, calibrePaths, pathPrefix = '', dbFilter, siteTitle = `Calibre 書庫 by ${pkgName}@${pkgVersion}` } = options;

	port ||= defaultServerOptions().port;
	cwd = resolve(cwd);

	calibrePaths ??= [cwd];

	const pathWithPrefix = (a = '', ...input) => [pathPrefix, a, ...input].join('/');

	console.info(`處理伺服器設定中`);

	const app = express();

	app.use(helmet());
	let localStatic = resolve(__dirname, '..', 'static');

	let staticPath = resolve(options.staticPath || localStatic);

	app.set('trust proxy', 1);

	app.use(favicon(parseFavicon(options.favicon) || defaultFavicon(staticPath, localStatic)));
	app.use('/static', express.static(staticPath));

	let dbList = await Bluebird
		.resolve(array_unique(calibrePaths).map(v => resolve(cwd, v)))
		.reduce(async (list, cwd) =>
		{

			let lp = findLibrarys({
				cwd,
			});

			if (dbFilter)
			{
				lp = lp.filter(dbFilter)
			}

			await lp.tap(ls => list.push(...ls));

			return list
		}, [] as IFindLibrarys[])
		.reduce(async (a, row) =>
		{

			let id = hash_sha1(row._fullpath);

			let p = pathWithPrefix(id);

			app.use(`${p}`, staticExtra(row._fulldir, {
				extensions: [EnumDataFormatLowerCase.EPUB],
				index: false,
			}));
			console.debug(`[static]`, p, `=>`, row._fulldir);

			a[id] = {
				...row,
				id,
				db: null,
				lazyload()
				{
					a[id].lazyload = () => Bluebird.resolve(a[id].db);

					return loadLibrary(row)
						.tap(db =>
						{
							a[id].db = db;
						})
						;
				},
			};

			return a;
		}, {} as Record<string, IFindLibrarysServer>)
	;

	if (!Object.keys(dbList).length)
	{
		let err = `無法在目標路徑內找到任何 Calibre metadata.db 資料庫`;
		console.error(err);
		return Bluebird.reject(new Error(err));
	}

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
