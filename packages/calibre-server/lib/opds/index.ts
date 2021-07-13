import initMain, { buildAsync, buildSync } from 'calibre-opds/lib/index';
import { ISharedHandlerOptions } from '../types';
import { EnumLinkRel, EnumMIME } from 'opds-extra/lib/const';
import { Link } from 'opds-extra/lib/v1/core';
import { Entry, Feed } from 'opds-extra/lib/v1';
import moment from '../moment';
import { ITSRequiredPick } from 'ts-type/lib/type/record';

export function buildOPDSIndex(options: ITSRequiredPick<ISharedHandlerOptions, 'dbList'| 'pathWithPrefix' |'siteTitle'>)
{
	let { dbList, pathWithPrefix, siteTitle } = options;

	let feed = buildSync<Feed>(initMain({
		title: siteTitle,
		subtitle: `Calibre 書庫`,
		icon: '/favicon.ico',
	}), [

		(feed) =>
		{
			feed.books = feed.books || [] as null;

			Object.entries(dbList)
				.forEach(([id, row]) => {

					feed.books.push(Entry.deserialize<Entry>({
						title: `書庫：${row.name}`,
						links: [
							{
								href: pathWithPrefix(row.id, 'opds'),
								title: EnumLinkRel.ALTERNATE,
								type: EnumMIME.OPDS_CATALOG_FEED_DOCUMENT,
							} as Link
						]
					}));

				})
			;

			return feed
		},

	]);

	return feed
}

export default buildOPDSIndex
