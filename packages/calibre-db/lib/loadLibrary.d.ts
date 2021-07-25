import { DB } from './DB';
import Bluebird from 'bluebird';
import { IFindLibrarys } from './types';
export declare function loadLibrary(dbEntry: Pick<IFindLibrarys, 'name' | '_fullpath'>): Bluebird<DB>;
export default loadLibrary;
