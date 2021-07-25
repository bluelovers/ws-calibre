import { envCalibrePath } from 'calibre-env/index';
import { async as crossSpawn } from 'cross-spawn-extra';
import { delimiter, resolve, dirname } from 'path';
import { SpawnOptions } from 'cross-spawn-extra/type';
import { handleOptions, IOptions } from '../handleOptions';

export function updateBookMetaFromOPF(target: string, options?: IOptions & {
	from?: string,
})
{
	target = resolve(options.cwd, target);
	let from = options.from ?? 'metadata.opf';

	from = resolve(dirname(target), from);

	return crossSpawn('ebook-meta', [
		target,
		'--from-opf',
		from,
	], options.spawnOptions)
}
