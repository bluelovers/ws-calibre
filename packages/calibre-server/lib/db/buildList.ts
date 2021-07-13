import Bluebird from 'bluebird';
import { array_unique } from 'array-hyper-unique';
import { resolve } from 'upath2';
import findLibrarys from 'calibre-db/lib/findLibrarys';
import { IFindLibrarys } from 'calibre-db/lib/types';
import { IServerOpotions } from '../server/options';
import { IFindLibrarysServer, ISharedHandlerOptions } from '../types';
import { hash_sha1 } from '../crypto';
import loadLibrary from 'calibre-db/lib/loadLibrary';
import { ITSRequiredPick } from 'ts-type/lib/type/record';

export function findLibraryFromPaths(options: Pick<IServerOpotions, 'cwd' | 'calibrePaths' | 'dbFilter'>)
{
	return Bluebird
		.resolve(array_unique(options.calibrePaths).map(v => resolve(options.cwd, v)))
		.reduce(async (list, cwd) =>
		{

			let lp = findLibrarys({
				cwd,
			});

			if (options.dbFilter)
			{
				lp = lp.filter(options.dbFilter)
			}

			await lp.tap(ls => list.push(...ls));

			return list
		}, [] as IFindLibrarys[])
	;
}

export function buildLibraryList(options: ITSRequiredPick<IServerOpotions, 'cwd' | 'calibrePaths' | 'dbFilter'>)
{
	return findLibraryFromPaths(options)
		.reduce(async (a, row) =>
		{
			let id = hash_sha1(row._fullpath);

			a[id] = {
				...row,
				id,
				db: null,
				lazyload()
				{
					a[id].lazyload = () => Bluebird.resolve(a[id].db);

					return loadLibrary(row)
						.tap(db =>
						{
							a[id].db = db;
						})
						;
				},
			};

			return a
		}, {} as Record<string, IFindLibrarysServer>)
}
