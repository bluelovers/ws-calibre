import { ISharedHandlerOptions } from '../types';
import { OPDSV1 } from 'opds-extra';
import { IBook } from 'calibre-db';
export declare function addBook(book: IBook, options: ISharedHandlerOptions, argv: {
    dbID: string;
}): OPDSV1.Entry;
export declare function buildOPDSID(options: ISharedHandlerOptions, argv: {
    dbID: string;
}): Promise<OPDSV1.Feed>;
export default buildOPDSID;
