/**
 * Created by user on 2020/1/14.
 */
export declare function propertiesCollapser<T>(arr: T[], collapsedName: string, regex: RegExp, sep?: string): (row: T, index: number) => T;
export default propertiesCollapser;
