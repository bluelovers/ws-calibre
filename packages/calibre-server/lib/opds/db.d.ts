import { ISharedHandlerOptions } from '../types';
import { IBook } from 'calibre-db';
export declare function addBook(book: IBook, options: ISharedHandlerOptions, argv: {
    dbID: string;
}): any;
export declare function buildOPDSID(options: ISharedHandlerOptions, argv: {
    dbID: string;
}): Promise<import("opds-extra/lib/v1/core").Feed>;
export default buildOPDSID;
