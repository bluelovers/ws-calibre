import { ISharedHandlerOptions } from '../types';
import { IBook } from 'calibre-db';
import { Entry, Feed } from 'opds-extra/lib/v1';
import { ITSRequiredPick } from 'ts-type/lib/type/record';
export declare function addBook(book: IBook, options: ITSRequiredPick<ISharedHandlerOptions, 'pathWithPrefix'>, argv: {
    dbID: string;
}): Entry;
export declare function buildOPDSID(options: ITSRequiredPick<ISharedHandlerOptions, 'dbList' | 'pathWithPrefix'>, argv: {
    dbID: string;
}): Promise<Feed>;
export default buildOPDSID;
