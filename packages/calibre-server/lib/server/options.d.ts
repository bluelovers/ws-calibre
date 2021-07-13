import { ITSResolvable } from 'ts-type';
import { IFaviconData } from '../types';
export interface IServerOpotions {
    cwd: string;
    port?: number;
    pathPrefix?: string;
    calibrePaths?: string[];
    dbFilter?(row: {
        name: any;
        _path: any;
        _fullpath: any;
    }): ITSResolvable<boolean>;
    siteTitle?: string;
    favicon?: IFaviconData;
    staticPath?: string;
}
export declare function defaultServerOptions(): {
    readonly port: 2020;
};
