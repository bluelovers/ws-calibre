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
import { Entry, Feed } from 'opds-extra/lib/v1';
import { ITSRequiredPick } from 'ts-type/lib/type/record';
import { isBookFile } from '../util/isBookFile';
import { lookup } from 'mime-types';

export function addBook(book: IBook, options: ITSRequiredPick<ISharedHandlerOptions, 'pathWithPrefix'>, argv: {
	dbID: string,
})
{
	let links = [];

	book.data.forEach(file => {

		if (isBookFile(file.data_format))
		{
			let href = options.pathWithPrefix.call(book, argv.dbID, getFilePath(file, book));

			links.push({
				rel: EnumLinkRel.ACQUISITION,
				href,
				type: lookup(`.${file.data_format}`) || EnumMIME.epub,
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
		let href = options.pathWithPrefix.call(book, argv.dbID, getCoverPath(book));

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

	return Entry.deserialize<Entry>({
		title: book.book_title,
		links,
		published: moment(book.book_timestamp).format(),
		updated: moment(book.book_last_modified).format(),
		summary: book.comment,
		identifier: book.book_uuid,
		authors,
	});
}

export async function buildOPDSID(options: ITSRequiredPick<ISharedHandlerOptions, 'dbList' | 'pathWithPrefix'>, argv: {
	dbID: string,
})
{
	let last_updated: number;

	return buildAsync<Feed>(initMain({
		title: `書庫：${options.dbList[argv.dbID].name}`,
		subtitle: `書庫：${options.dbList[argv.dbID].name}`,
		icon: '/favicon.ico',
	}), [

		(feed) =>
		{
			feed.books ||= [];

			Object.entries(options.dbList)
				.forEach(([id, row]) => {

					if (argv.dbID == row.id)
					{
						return;
					}

					feed.books.push(Entry.deserialize<Entry>({
						title: `書庫：${row.name}`,
						links: [
							{
								href: options.pathWithPrefix.call(void 0, row.id, 'opds'),
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
			feed.books ||= [];

			let db = await options.dbList[argv.dbID].lazyload();

			let ls = await db.getBooks()
				.catch(e => [] as null)
				.then(books => {

					books.forEach(book => {

						// @ts-ignore
						book.timestamp = moment(book.book_timestamp).valueOf();

					});

					// @ts-ignore
					books = books.sort((a, b) => b.timestamp - a.timestamp);

					return books;
				})
				.map(book => {

					// @ts-ignore
					last_updated ??= book.timestamp;

					return addBook(book, options, argv)
				})
			;

			feed.books.push(...ls);

			return feed
		},

		(feed) => {

			feed.updated ||= last_updated || moment().startOf('day');

			return feed
		},

	]);
}

export default buildOPDSID
