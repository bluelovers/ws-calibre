import { ISharedHandlerOptions } from '../types';
import { Feed } from 'opds-extra/lib/v1';
import { ITSRequiredPick } from 'ts-type/lib/type/record';
export declare function buildOPDSIndex(options: ITSRequiredPick<ISharedHandlerOptions, 'dbList' | 'pathWithPrefix' | 'siteTitle'>): Feed;
export default buildOPDSIndex;
