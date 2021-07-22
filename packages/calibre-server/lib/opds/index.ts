import initMain, { buildAsync, buildSync } from 'calibre-opds/lib/index';
import { ISharedHandlerOptions } from '../types';
import { EnumLinkRel, EnumMIME } from 'opds-extra/lib/const';
import { Link } from 'opds-extra/lib/v1/core';
import { Entry, Feed } from 'opds-extra/lib/v1';
import moment from '../moment';
import { ITSRequiredPick } from 'ts-type/lib/type/record';

export function buildOPDSIndex(options: ITSRequiredPick<ISharedHandlerOptions, 'dbList'| 'pathWithPrefix' |'siteTitle'>)
{
	return buildSync<Feed>(initMain({
		title: options.siteTitle,
		subtitle: `Calibre 書庫`,
		icon: '/favicon.ico',
	}), [

		(feed) =>
		{
			feed.books = feed.books || [] as null;

			Object.entries(options.dbList)
				.forEach(([id, row]) => {

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

		(feed) => {

			feed.updated ||= moment().startOf('day');

			return feed
		},

	]);
}

export default buildOPDSIndex
