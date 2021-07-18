"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOPDSIndex = void 0;
const tslib_1 = require("tslib");
const index_1 = (0, tslib_1.__importStar)(require("calibre-opds/lib/index"));
const const_1 = require("opds-extra/lib/const");
const v1_1 = require("opds-extra/lib/v1");
function buildOPDSIndex(options) {
    let { pathWithPrefix, siteTitle } = options;
    let feed = (0, index_1.buildSync)((0, index_1.default)({
        title: siteTitle,
        subtitle: `Calibre 書庫`,
        icon: '/favicon.ico',
    }), [
        (feed) => {
            feed.books = feed.books || [];
            Object.entries(options.dbList)
                .forEach(([id, row]) => {
                feed.books.push(v1_1.Entry.deserialize({
                    title: `書庫：${row.name}`,
                    links: [
                        {
                            href: pathWithPrefix(row.id, 'opds'),
                            title: const_1.EnumLinkRel.ALTERNATE,
                            type: const_1.EnumMIME.OPDS_CATALOG_FEED_DOCUMENT,
                        }
                    ]
                }));
            });
            return feed;
        },
    ]);
    return feed;
}
exports.buildOPDSIndex = buildOPDSIndex;
exports.default = buildOPDSIndex;
//# sourceMappingURL=index.js.map