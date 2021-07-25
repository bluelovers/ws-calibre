import { SpawnOptions } from 'cross-spawn-extra';
export interface IOptions {
    calibrePath?: string;
    outputPath?: string;
    cwd?: string;
    spawnOptions?: SpawnOptions;
}
export declare function handleOptions<T extends IOptions>(options?: T): T;
