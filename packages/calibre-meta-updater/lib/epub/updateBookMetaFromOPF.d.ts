/// <reference types="node" />
import { IOptions } from '../handleOptions';
export declare function updateBookMetaFromOPF(target: string, options?: IOptions & {
    from?: string;
}): import("cross-spawn-extra").SpawnASyncReturnsPromise<Buffer>;
