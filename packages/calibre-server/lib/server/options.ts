import { ITSResolvable } from 'ts-type';
import { IFaviconData } from '../types';

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

export function defaultServerOptions()
{
	return {
		port: 2020,
	} as const
}
