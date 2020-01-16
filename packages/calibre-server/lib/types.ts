import { IFindLibrarys } from 'calibre-db';
import { DB } from 'calibre-db/lib/DB';
import Bluebird from 'bluebird';
import { Express } from 'express';

export interface IFindLibrarysServer extends IFindLibrarys
{
	id: string,
	db?: DB,
	lazyload(): Bluebird<DB>
}

export interface ISharedHandlerOptions
{
	app: Express,
	port: number,

	pathWithPrefix(...argv: string[]): string,

	dbList: Record<string, IFindLibrarysServer>,

	siteTitle: string,
}

export type IFaviconData = string | Buffer | {
	mime?: string,
	type: BufferEncoding,
	value: string,
};
