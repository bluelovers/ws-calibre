import { OPDSV1 } from 'opds-extra';
import { Feed } from 'opds-extra/lib/v1';
import { IParseOptions } from 'ta-json-x';
import { ITSResolvable } from 'ts-type';
import Bluebird from 'bluebird';
export declare function initMain(json: Feed.TSTYPE, options?: IParseOptions): OPDSV1.Feed;
export declare function buildAsync<T extends Feed>(feed: ITSResolvable<T>, fns: ((feed: T) => ITSResolvable<T>)[]): Bluebird<T>;
export declare function buildSync<T extends Feed>(feed: T, fns: ((feed: T) => T)[]): T;
export default initMain;
