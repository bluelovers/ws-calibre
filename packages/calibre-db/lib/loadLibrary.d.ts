import { DB } from './DB';
import Bluebird from 'bluebird';
export declare function loadLibrary(row: {
    name: string;
    _fullpath: string;
}): Bluebird<DB>;
export default loadLibrary;
