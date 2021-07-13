"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOPDSIndex = void 0;
const tslib_1 = require("tslib");
const index_1 = (0, tslib_1.__importStar)(require("calibre-opds/lib/index"));
const const_1 = require("opds-extra/lib/const");
const opds_extra_1 = require("opds-extra");
function buildOPDSIndex(options) {
    let { dbList } = options;
    let feed = (0, index_1.buildSync)((0, index_1.default)({
        title: options.siteTitle,
        subtitle: `Calibre 書庫`,
        icon: '/favicon.ico',
    }), [
        (feed) => {
            feed.books = feed.books || [];
            Object.entries(dbList)
                .forEach(([id, row]) => {
                feed.books.push(opds_extra_1.OPDSV1.Entry.deserialize({
                    title: `書庫：${row.name}`,
                    links: [
                        {
                            href: options.pathWithPrefix(row.id, 'opds'),
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