import FastGlob from '@bluelovers/fast-glob/bluebird';
import findLibrarys from 'calibre-db/lib/findLibrarys';
import { updateBookMetaFromOPF } from '../lib/epub/updateBookMetaFromOPF';
import { delimiter, resolve, dirname, relative, join } from 'path';
import { handleOptions } from '../lib/handleOptions';
import { loadLibrary } from 'calibre-db/lib/loadLibrary';
import moment, { Moment } from 'moment';
import { readJSON, writeJSON } from 'fs-extra';
import Bluebird from 'bluebird';
import { isBookFile } from 'calibre-server/lib/util/isBookFile';
import { getFilePath } from 'calibre-db/lib/utils/index';
import { EnumLinkRel, EnumMIME } from 'opds-extra/lib/const';
import { lookup } from 'mime-types';
import fileext from 'calibre-db/lib/utils/fileext';

let cwd = 'D:\\Program Files (Portable)\\Calibre Portable';

let idx = 1;

Bluebird.resolve(readJSON('./stat.json'))
	.catchReturn({} as {
		last_modified: Moment
	})
	.then(data =>
	{

		data.last_modified ||= moment(new Date(2021, 7 - 1, 24));
		data.last_modified = moment(data.last_modified);

		return data
	})
	.tap(data =>
	{

		return findLibrarys({
			cwd,
		})
			.mapSeries(async (dbEntry) =>
			{

				console.log(`search`, dbEntry.name, dbEntry._fulldir);

				let options = handleOptions({
					cwd,
					calibrePath: cwd,
					spawnOptions: {
						stdio: 'ignore',
					},
				});

				const db = await loadLibrary(dbEntry);

				await db.getBooks()
					.catchReturn([] as null)
					.mapSeries(async (book) =>
					{

						let last_modified = moment(book.book_last_modified);

						console.log(last_modified, data.last_modified, last_modified.isAfter(data.last_modified))

						if (last_modified.isAfter(data.last_modified))
						{
							await Bluebird.resolve(book.data)
								.mapSeries(file =>
								{

									if (fileext(file.data_format).includes('epub'))
									{

										let input = join(book.book_path, file.data_name + fileext(file.data_format))

										console.log(idx++, dbEntry.name, book.book_title, input);

										return updateBookMetaFromOPF(join(dbEntry._fulldir, input), options)
									}

								});
						}

					})
				;

			})
	})
	.tap(data =>
	{
		data.last_modified = moment().valueOf();

		return writeJSON('./stat.json', data)
	})
;





