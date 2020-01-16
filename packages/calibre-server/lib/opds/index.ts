import initMain, { buildAsync, buildSync } from 'calibre-opds/lib/index';
import { ISharedHandlerOptions } from '../types';
import { EnumLinkRel, EnumMIME } from 'opds-extra/lib/const';
import { Link } from 'opds-extra/lib/v1/core';
import { OPDSV1 } from 'opds-extra';
import moment from '../moment';

export function buildOPDSIndex(options: ISharedHandlerOptions)
{
	let { dbList } = options;

	let feed = buildSync(initMain({
		title: options.siteTitle,
		subtitle: `Calibre 書庫`,
		icon: '/favicon.ico',
	}), [

		(feed) =>
		{
			feed.books = feed.books || [];

			Object.entries(dbList)
				.forEach(([id, row]) => {

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

	]);

	return feed
}

export default buildOPDSIndex
