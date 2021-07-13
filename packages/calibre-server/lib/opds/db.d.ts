import { ISharedHandlerOptions } from '../types';
import { IBook } from 'calibre-db';
import { Entry } from 'opds-extra/lib/v1';
export declare function addBook(book: IBook, options: ISharedHandlerOptions, argv: {
    dbID: string;
}): Entry;
export declare function buildOPDSID(options: ISharedHandlerOptions, argv: {
    dbID: string;
}): Promise<import("opds-extra/lib/v1").Feed>;
export default buildOPDSID;
