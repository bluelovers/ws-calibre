/// <reference types="node" />
import { IOptions } from '../handleOptions';
export declare function getCoverFromBook(target: string, options?: IOptions & {
    filename?: string;
}): import("cross-spawn-extra").SpawnASyncReturnsPromise<Buffer>;
