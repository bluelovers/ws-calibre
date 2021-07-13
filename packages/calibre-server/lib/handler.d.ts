import { ISharedHandlerOptions } from './types';
import { ITSRequiredPick } from 'ts-type/lib/type/record';
export declare function createHandler(options: ITSRequiredPick<ISharedHandlerOptions, 'dbList' | 'pathWithPrefix' | 'siteTitle'>): import("express-serve-static-core").Router;
export default createHandler;
