/// <reference types="node" />
import { Console2 } from 'debug-color2';
import { Server } from 'http';
export declare const console: Console2;
export declare function createServer(options?: {
    port?: number;
    targetPort?: number;
    target?: string;
}): Server;
export default createServer;
