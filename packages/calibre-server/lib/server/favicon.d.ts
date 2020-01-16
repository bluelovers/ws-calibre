/// <reference types="node" />
import { IFaviconData } from '../types';
export declare function parseFavicon(favicon: IFaviconData): string | Buffer;
export declare function defaultFavicon(staticPath: string, localStatic: string): string;
