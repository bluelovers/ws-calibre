"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOPDSID = exports.addBook = void 0;
const tslib_1 = require("tslib");
const index_1 = (0, tslib_1.__importStar)(require("calibre-opds/lib/index"));
const const_1 = require("opds-extra/lib/const");
const moment_1 = (0, tslib_1.__importDefault)(require("../moment"));
const calibre_db_1 = require("calibre-db");
const index_2 = require("calibre-db/lib/utils/index");
const mime_types_1 = (0, tslib_1.__importDefault)(require("mime-types"));
const v1_1 = require("opds-extra/lib/v1");
const isBookFile_1 = require("../util/isBookFile");
const mime_types_2 = require("mime-types");
function addBook(book, options, argv) {
    let { pathWithPrefix } = options;
    let links = [];
    book.data.forEach(file => {
        if ((0, isBookFile_1.isBookFile)(file.data_format)) {
            let href = pathWithPrefix.call(book, argv.dbID, (0, calibre_db_1.getFilePath)(file, book));
            links.push({
                rel: const_1.EnumLinkRel.ACQUISITION,
                href,
                type: (0, mime_types_2.lookup)(`.${file.data_format}`) || const_1.EnumMIME.epub,
            });
        }
    });
    let authors = [];
    book.authors.forEach(v => {
        if (v.author_name) {
            authors.push({
                name: v.author_name
            });
        }
    });
    if (book.book_has_cover) {
        let href = pathWithPrefix.call(book, argv.dbID, (0, index_2.getCoverPath)(book));
        let type = mime_types_1.default.lookup(href);
        links.push({
            rel: const_1.EnumLinkRel.IMAGE,
            href,
            type,
        });
        links.push({
            rel: const_1.EnumLinkRel.IMAGE_THUMBNAIL,
            href,
            type,
        });
    }
    //console.dir(book)
    return v1_1.Entry.deserialize({
        title: book.book_title,
        links,
        published: (0, moment_1.default)(book.book_timestamp).format(),
        updated: (0, moment_1.default)(book.book_last_modified).format(),
        summary: book.comment,
        identifier: book.book_uuid,
        authors,
    });
}
exports.addBook = addBook;
async function buildOPDSID(options, argv) {
    let { pathWithPrefix } = options;
    let db = await options.dbList[argv.dbID].lazyload();
    let feed = await (0, index_1.buildAsync)((0, index_1.default)({
        title: `書庫：${options.dbList[argv.dbID].name}`,
        subtitle: `書庫：${options.dbList[argv.dbID].name}`,
        icon: '/favicon.ico',
    }), [
        (feed) => {
            feed.books = feed.books || [];
            Object.entries(options.dbList)
                .forEach(([id, row]) => {
                if (argv.dbID == row.id) {
                    return;
                }
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
        async (feed) => {
            feed.books = feed.books || [];
            let ls = await db.getBooks()
                .map(book => addBook(book, options, argv));
            feed.books.push(...ls);
            return feed;
        },
    ]);
    return feed;
}
exports.buildOPDSID = buildOPDSID;
exports.default = buildOPDSID;
//# sourceMappingURL=db.js.map