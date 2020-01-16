/// <reference types="node" />
import { ITSResolvable } from 'ts-type';
import { IFaviconData } from './types';
export declare function createServer(options: {
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
}): Promise<import("http").Server>;
export default createServer;
