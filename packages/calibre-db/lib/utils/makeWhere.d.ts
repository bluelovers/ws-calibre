export declare type ILocator = string | '*' | '' | '/';
export declare function makeWhere<T extends Record<string, any>>(tableName: string, locator: ILocator, columnName?: keyof T, sep?: string): readonly [string, string];
export default makeWhere;
