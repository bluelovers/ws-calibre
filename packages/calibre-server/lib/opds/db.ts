import initMain, { buildAsync, buildSync } from 'calibre-opds/lib/index';
import { ISharedHandlerOptions } from '../types';
import { EnumLinkRel, EnumMIME } from 'opds-extra/lib/const';
import { Link } from 'opds-extra/lib/v1/core';
import { OPDSV1 } from 'opds-extra';
import moment from '../moment';
import { IBook, EnumDataFormatLowerCase, getFilePath } from 'calibre-db';
import fileext from 'calibre-db/lib/utils/fileext';
import { getCoverPath } from 'calibre-db/lib/utils/index';
import MIMETypes from 'mime-types';

export function addBook(book: IBook, options: ISharedHandlerOptions, argv: {
	dbID: string,
})
{
	let { pathWithPrefix } = options;

	let links = [];

	book.data.forEach(file => {

		if (fileext(file.data_format) === EnumDataFormatLowerCase.EPUB)
		{
			let href = pathWithPrefix(argv.dbID, getFilePath(file, book));

			links.push({
				rel: EnumLinkRel.ACQUISITION,
				href,
				type: EnumMIME.epub,
			})
		}

	});

	let authors = [];

	book.authors.forEach(v => {
		if (v.author_name)
		{
			authors.push({
				name: v.author_name
			})
		}
	});

	if (book.book_has_cover)
	{
		let href = pathWithPrefix(argv.dbID, getCoverPath(book));

		let type = MIMETypes.lookup(href);

		links.push({
			rel: EnumLinkRel.IMAGE,
			href,
			type,
		});

		links.push({
			rel: EnumLinkRel.IMAGE_THUMBNAIL,
			href,
			type,
		});
	}

	//console.dir(book)

	return OPDSV1.Entry.deserialize<OPDSV1.Entry>({
		title: book.book_title,
		links,
		updated: moment(book.book_date).format(),
		summary: book.comment,
		authors,
	});
}

export async function buildOPDSID(options: ISharedHandlerOptions, argv: {
	dbID: string,
})
{
	let { dbList } = options;

	let db = await dbList[argv.dbID].lazyload();

	let feed = await buildAsync(initMain({
		title: `書庫：${dbList[argv.dbID].name}`,
		subtitle: `書庫：${dbList[argv.dbID].name}`,
		icon: '/favicon.ico',
	}), [

		(feed) =>
		{
			feed.books = feed.books || [];

			Object.entries(dbList)
				.forEach(([id, row]) => {

					if (argv.dbID == row.id)
					{
						return;
					}

					feed.books.push(OPDSV1.Entry.deserialize<OPDSV1.Entry>({
						title: `書庫：${row.name}`,
						links: [
							{
								href: options.pathWithPrefix(row.id, 'opds'),
								title: EnumLinkRel.ALTERNATE,
								type: EnumMIME.OPDS_CATALOG_FEED_DOCUMENT,
							} as Link
						]
					}));

				})
			;

			return feed
		},

		async (feed) =>
		{
			feed.books = feed.books || [];

			let ls = await db.getBooks()
				.map(book => addBook(book, options, argv))
			;

			feed.books.push(...ls);

			return feed
		},

	]);

	return feed
}

export default buildOPDSID
