import { Database } from 'sqlite3';
import { ILocator } from './utils/makeWhere';
import { IBook, IAuthor, ISeries, ITag } from './types';
import { Select } from 'squel';
import Bluebird from 'bluebird';
export declare class DB {
    protected readonly _name: string;
    protected readonly _path: string;
    protected readonly _db: Database;
    protected _debug: boolean;
    protected _logger: Console;
    constructor(_name: string, _path: string, _db: Database);
    debug(doDebug: boolean): void;
    logger(logger: Console): void;
    getLogger(): Console;
    log<T>(thing: T): void;
    error<T>(thing: T): void;
    db(): Database;
    name(): string;
    path(): string;
    execute<T>(statement: Select): Bluebird<T[]>;
    getBook(book: ILocator | number, columnName?: 'book_id' | 'book_uuid'): Bluebird<IBook>;
    getBooks(book?: ILocator | number, columnName?: keyof IBook): Bluebird<IBook[]>;
    getTags(tag?: ILocator): Bluebird<ITag[]>;
    getSeries(series?: ILocator): Bluebird<ISeries[]>;
    getAuthors(author?: ILocator): Bluebird<IAuthor[]>;
    endpoint<T>(endPoints: T): {
        name: string;
        type: "database";
        endPoints: T;
    };
}
export declare function createDB(name: string, path: string): Bluebird<DB>;
export default createDB;
