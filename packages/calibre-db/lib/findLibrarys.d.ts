/**
 * Created by user on 2020/1/14.
 */
import Bluebird from 'bluebird';
export declare function findLibrarys(options: {
    cwd: string;
}): Bluebird<{
    name: string;
    _path: string;
    _fullpath: string;
}[]>;
export default findLibrarys;
