import { dirname, resolve } from 'path';
import { async as crossSpawn } from 'cross-spawn-extra';
import { handleOptions, IOptions } from '../handleOptions';

export function getCoverFromBook(target: string, options?: IOptions & {
	filename?: string,
})
{
	target = resolve(options.cwd, target);
	let outputFile = options.filename || 'cover.jpg';


	outputFile = resolve(options.outputPath || dirname(target), outputFile);

	return crossSpawn('ebook-meta', [
		`--get-cover=${outputFile}`,
		target,
	], options.spawnOptions)
}
