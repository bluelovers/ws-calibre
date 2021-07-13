import { ITSResolvable } from 'ts-type';
import { IFaviconData } from '../types';
import { envCalibrePath, ICalibreEnv } from 'calibre-env';

export interface IServerOpotions
{
	cwd: string;
	port?: number;
	pathPrefix?: string;
	calibrePaths?: string[];

	dbFilter?(row: {
		name,
		_path,
		_fullpath,
	}): ITSResolvable<boolean>;

	siteTitle?: string;
	favicon?: IFaviconData;
	staticPath?: string;
}

export function defaultServerOptions(env?: Record<any, any>)
{
	return {
		port: 2020,
		calibrePath: envCalibrePath(env),
	} as const
}
