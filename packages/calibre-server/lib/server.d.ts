/// <reference types="node" />
import { IServerOpotions } from './server/options';
export declare function createServer(options: IServerOpotions): Promise<import("http").Server>;
export default createServer;
