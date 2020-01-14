/**
 * Created by user on 2020/1/14.
 */
export declare function compose<T>(...fns: ((row: T, index: number) => T)[]): (row: T, index: number) => T;
export default compose;
