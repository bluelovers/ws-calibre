import { SpawnOptions } from 'cross-spawn-extra';
import { envCalibrePath } from '../../calibre-env/index';
import { delimiter, resolve } from 'path';

export interface IOptions
{
	calibrePath?: string;
	outputPath?: string;
	cwd?: string;

	spawnOptions?: SpawnOptions,
}

export function handleOptions<T extends IOptions>(options?: T): T
{
	options ??= {} as null;
	options = {
		...options,
	}

	options.cwd ??= process.cwd();
	options.calibrePath ??= envCalibrePath() ?? options.cwd;
	options.spawnOptions ??= {};

	options.spawnOptions.env = {
		...process.env,
		...options.spawnOptions.env,
	}

	options.spawnOptions.env.PATH = [
		options.calibrePath,
		resolve(options.calibrePath, 'Calibre'),
		options.spawnOptions.env.PATH,
	].filter(Boolean).join(delimiter);

	options.spawnOptions.cwd = options.cwd;

	return options
}
