"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("calibre-opds/lib/index"));
const const_1 = require("opds-extra/lib/const");
const opds_extra_1 = require("opds-extra");
const moment_1 = __importDefault(require("../moment"));
const calibre_db_1 = require("calibre-db");
const fileext_1 = __importDefault(require("calibre-db/lib/utils/fileext"));
const index_2 = require("calibre-db/lib/utils/index");
const mime_types_1 = __importDefault(require("mime-types"));
function addBook(book, options, argv) {
    let { pathWithPrefix } = options;
    let links = [];
    book.data.forEach(file => {
        if (fileext_1.default(file.data_format) === "epub" /* EPUB */) {
            let href = pathWithPrefix(argv.dbID, calibre_db_1.getFilePath(file, book));
            links.push({
                rel: const_1.EnumLinkRel.ACQUISITION,
                href,
                type: const_1.EnumMIME.epub,
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
        let href = pathWithPrefix(argv.dbID, index_2.getCoverPath(book));
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
    return opds_extra_1.OPDSV1.Entry.deserialize({
        title: book.book_title,
        links,
        published: moment_1.default(book.book_timestamp).format(),
        updated: moment_1.default(book.book_last_modified).format(),
        summary: book.comment,
        identifier: book.book_uuid,
        authors,
    });
}
exports.addBook = addBook;
async function buildOPDSID(options, argv) {
    let { dbList } = options;
    let db = await dbList[argv.dbID].lazyload();
    let feed = await index_1.buildAsync(index_1.default({
        title: `書庫：${dbList[argv.dbID].name}`,
        subtitle: `書庫：${dbList[argv.dbID].name}`,
        icon: '/favicon.ico',
    }), [
        (feed) => {
            feed.books = feed.books || [];
            Object.entries(dbList)
                .forEach(([id, row]) => {
                if (argv.dbID == row.id) {
                    return;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnRUFBeUU7QUFFekUsZ0RBQTZEO0FBRTdELDJDQUFvQztBQUNwQyx1REFBK0I7QUFDL0IsMkNBQXlFO0FBQ3pFLDJFQUFtRDtBQUNuRCxzREFBMEQ7QUFDMUQsNERBQW1DO0FBRW5DLFNBQWdCLE9BQU8sQ0FBQyxJQUFXLEVBQUUsT0FBOEIsRUFBRSxJQUVwRTtJQUVBLElBQUksRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFakMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFeEIsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQWlDLEVBQzlEO1lBQ0MsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsd0JBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUU5RCxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNWLEdBQUcsRUFBRSxtQkFBVyxDQUFDLFdBQVc7Z0JBQzVCLElBQUk7Z0JBQ0osSUFBSSxFQUFFLGdCQUFRLENBQUMsSUFBSTthQUNuQixDQUFDLENBQUE7U0FDRjtJQUVGLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFDakI7WUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVzthQUNuQixDQUFDLENBQUE7U0FDRjtJQUNGLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUN2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TyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDMUM7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBRXZCLE9BQU8sSUFBSSxDQUFBO1FBQ1osQ0FBQztLQUVELENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFBO0FBQ1osQ0FBQztBQTNERCxrQ0EyREM7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW5pdE1haW4sIHsgYnVpbGRBc3luYywgYnVpbGRTeW5jIH0gZnJvbSAnY2FsaWJyZS1vcGRzL2xpYi9pbmRleCc7XG5pbXBvcnQgeyBJU2hhcmVkSGFuZGxlck9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBFbnVtTGlua1JlbCwgRW51bU1JTUUgfSBmcm9tICdvcGRzLWV4dHJhL2xpYi9jb25zdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnb3Bkcy1leHRyYS9saWIvdjEvY29yZSc7XG5pbXBvcnQgeyBPUERTVjEgfSBmcm9tICdvcGRzLWV4dHJhJztcbmltcG9ydCBtb21lbnQgZnJvbSAnLi4vbW9tZW50JztcbmltcG9ydCB7IElCb29rLCBFbnVtRGF0YUZvcm1hdExvd2VyQ2FzZSwgZ2V0RmlsZVBhdGggfSBmcm9tICdjYWxpYnJlLWRiJztcbmltcG9ydCBmaWxlZXh0IGZyb20gJ2NhbGlicmUtZGIvbGliL3V0aWxzL2ZpbGVleHQnO1xuaW1wb3J0IHsgZ2V0Q292ZXJQYXRoIH0gZnJvbSAnY2FsaWJyZS1kYi9saWIvdXRpbHMvaW5kZXgnO1xuaW1wb3J0IE1JTUVUeXBlcyBmcm9tICdtaW1lLXR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEJvb2soYm9vazogSUJvb2ssIG9wdGlvbnM6IElTaGFyZWRIYW5kbGVyT3B0aW9ucywgYXJndjoge1xuXHRkYklEOiBzdHJpbmcsXG59KVxue1xuXHRsZXQgeyBwYXRoV2l0aFByZWZpeCB9ID0gb3B0aW9ucztcblxuXHRsZXQgbGlua3MgPSBbXTtcblxuXHRib29rLmRhdGEuZm9yRWFjaChmaWxlID0+IHtcblxuXHRcdGlmIChmaWxlZXh0KGZpbGUuZGF0YV9mb3JtYXQpID09PSBFbnVtRGF0YUZvcm1hdExvd2VyQ2FzZS5FUFVCKVxuXHRcdHtcblx0XHRcdGxldCBocmVmID0gcGF0aFdpdGhQcmVmaXgoYXJndi5kYklELCBnZXRGaWxlUGF0aChmaWxlLCBib29rKSk7XG5cblx0XHRcdGxpbmtzLnB1c2goe1xuXHRcdFx0XHRyZWw6IEVudW1MaW5rUmVsLkFDUVVJU0lUSU9OLFxuXHRcdFx0XHRocmVmLFxuXHRcdFx0XHR0eXBlOiBFbnVtTUlNRS5lcHViLFxuXHRcdFx0fSlcblx0XHR9XG5cblx0fSk7XG5cblx0bGV0IGF1dGhvcnMgPSBbXTtcblxuXHRib29rLmF1dGhvcnMuZm9yRWFjaCh2ID0+IHtcblx0XHRpZiAodi5hdXRob3JfbmFtZSlcblx0XHR7XG5cdFx0XHRhdXRob3JzLnB1c2goe1xuXHRcdFx0XHRuYW1lOiB2LmF1dGhvcl9uYW1lXG5cdFx0XHR9KVxuXHRcdH1cblx0fSk7XG5cblx0aWYgKGJvb2suYm9va19oYXNfY292ZXIpXG5cdHtcblx0XHRsZXQgaHJlZiA9IHBhdGhXaXRoUHJlZml4KGFyZ3YuZGJJRCwgZ2V0Q292ZXJQYXRoKGJvb2spKTtcblxuXHRcdGxldCB0eXBlID0gTUlNRVR5cGVzLmxvb2t1cChocmVmKTtcblxuXHRcdGxpbmtzLnB1c2goe1xuXHRcdFx0cmVsOiBFbnVtTGlua1JlbC5JTUFHRSxcblx0XHRcdGhyZWYsXG5cdFx0XHR0eXBlLFxuXHRcdH0pO1xuXG5cdFx0bGlua3MucHVzaCh7XG5cdFx0XHRyZWw6IEVudW1MaW5rUmVsLklNQUdFX1RIVU1CTkFJTCxcblx0XHRcdGhyZWYsXG5cdFx0XHR0eXBlLFxuXHRcdH0pO1xuXHR9XG5cblx0Ly9jb25zb2xlLmRpcihib29rKVxuXG5cdHJldHVybiBPUERTVjEuRW50cnkuZGVzZXJpYWxpemU8T1BEU1YxLkVudHJ5Pih7XG5cdFx0dGl0bGU6IGJvb2suYm9va190aXRsZSxcblx0XHRsaW5rcyxcblx0XHRwdWJsaXNoZWQ6IG1vbWVudChib29rLmJvb2tfdGltZXN0YW1wKS5mb3JtYXQoKSxcblx0XHR1cGRhdGVkOiBtb21lbnQoYm9vay5ib29rX2xhc3RfbW9kaWZpZWQpLmZvcm1hdCgpLFxuXHRcdHN1bW1hcnk6IGJvb2suY29tbWVudCxcblx0XHRpZGVudGlmaWVyOiBib29rLmJvb2tfdXVpZCxcblx0XHRhdXRob3JzLFxuXHR9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkT1BEU0lEKG9wdGlvbnM6IElTaGFyZWRIYW5kbGVyT3B0aW9ucywgYXJndjoge1xuXHRkYklEOiBzdHJpbmcsXG59KVxue1xuXHRsZXQgeyBkYkxpc3QgfSA9IG9wdGlvbnM7XG5cblx0bGV0IGRiID0gYXdhaXQgZGJMaXN0W2FyZ3YuZGJJRF0ubGF6eWxvYWQoKTtcblxuXHRsZXQgZmVlZCA9IGF3YWl0IGJ1aWxkQXN5bmMoaW5pdE1haW4oe1xuXHRcdHRpdGxlOiBg5pu45bqr77yaJHtkYkxpc3RbYXJndi5kYklEXS5uYW1lfWAsXG5cdFx0c3VidGl0bGU6IGDmm7jluqvvvJoke2RiTGlzdFthcmd2LmRiSURdLm5hbWV9YCxcblx0XHRpY29uOiAnL2Zhdmljb24uaWNvJyxcblx0fSksIFtcblxuXHRcdChmZWVkKSA9PlxuXHRcdHtcblx0XHRcdGZlZWQuYm9va3MgPSBmZWVkLmJvb2tzIHx8IFtdO1xuXG5cdFx0XHRPYmplY3QuZW50cmllcyhkYkxpc3QpXG5cdFx0XHRcdC5mb3JFYWNoKChbaWQsIHJvd10pID0+IHtcblxuXHRcdFx0XHRcdGlmIChhcmd2LmRiSUQgPT0gcm93LmlkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmZWVkLmJvb2tzLnB1c2goT1BEU1YxLkVudHJ5LmRlc2VyaWFsaXplPE9QRFNWMS5FbnRyeT4oe1xuXHRcdFx0XHRcdFx0dGl0bGU6IGDmm7jluqvvvJoke3Jvdy5uYW1lfWAsXG5cdFx0XHRcdFx0XHRsaW5rczogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0aHJlZjogb3B0aW9ucy5wYXRoV2l0aFByZWZpeChyb3cuaWQsICdvcGRzJyksXG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6IEVudW1MaW5rUmVsLkFMVEVSTkFURSxcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBFbnVtTUlNRS5PUERTX0NBVEFMT0dfRkVFRF9ET0NVTUVOVCxcblx0XHRcdFx0XHRcdFx0fSBhcyBMaW5rXG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdH0pXG5cdFx0XHQ7XG5cblx0XHRcdHJldHVybiBmZWVkXG5cdFx0fSxcblxuXHRcdGFzeW5jIChmZWVkKSA9PlxuXHRcdHtcblx0XHRcdGZlZWQuYm9va3MgPSBmZWVkLmJvb2tzIHx8IFtdO1xuXG5cdFx0XHRsZXQgbHMgPSBhd2FpdCBkYi5nZXRCb29rcygpXG5cdFx0XHRcdC5tYXAoYm9vayA9PiBhZGRCb29rKGJvb2ssIG9wdGlvbnMsIGFyZ3YpKVxuXHRcdFx0O1xuXG5cdFx0XHRmZWVkLmJvb2tzLnB1c2goLi4ubHMpO1xuXG5cdFx0XHRyZXR1cm4gZmVlZFxuXHRcdH0sXG5cblx0XSk7XG5cblx0cmV0dXJuIGZlZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRPUERTSURcbiJdfQ==