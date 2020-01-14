/**
 * Created by user on 2020/1/14.
 */
import Bluebird from 'bluebird';
import { IFindLibrarys } from './types';
export declare function findLibrarys(options: {
    cwd: string;
}): Bluebird<IFindLibrarys[]>;
export default findLibrarys;
