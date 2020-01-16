import { OPDSV1 } from 'opds-extra';
import { Feed } from 'opds-extra/lib/v1';
import { IParseOptions } from 'ta-json-x';
import { ITSResolvable } from 'ts-type';
import Bluebird from 'bluebird';

export function initMain(json: Feed.TSTYPE, options?: IParseOptions)
{
	return OPDSV1.Feed.deserialize(json, options);
}

export function buildAsync<T extends Feed>(feed: ITSResolvable<T>, fns: ((feed: T) => ITSResolvable<T>)[])
{
	return Bluebird.resolve(feed)
		.then((feed) => {
			return Bluebird.resolve(fns)
				.reduce((feed, fn) => {
					return fn(feed)
				}, feed)
		})
	;
}

export function buildSync<T extends Feed>(feed: T, fns: ((feed: T) => T)[])
{
	return fns
		.reduce((feed, fn) => {
			return fn(feed)
		}, feed)
		;
}

export default initMain

