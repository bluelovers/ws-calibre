/**
 * Created by user on 2020/1/14.
 */
export declare type ILocator = string | '*' | '' | '/';
export declare function makeWhere(tableName: string, locator: ILocator, columnName?: string, sep?: string): string[];
export default makeWhere;
