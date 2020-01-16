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
        updated: moment_1.default(book.book_date).format(),
        summary: book.comment,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnRUFBeUU7QUFFekUsZ0RBQTZEO0FBRTdELDJDQUFvQztBQUNwQyx1REFBK0I7QUFDL0IsMkNBQXlFO0FBQ3pFLDJFQUFtRDtBQUNuRCxzREFBMEQ7QUFDMUQsNERBQW1DO0FBRW5DLFNBQWdCLE9BQU8sQ0FBQyxJQUFXLEVBQUUsT0FBOEIsRUFBRSxJQUVwRTtJQUVBLElBQUksRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFakMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFeEIsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQWlDLEVBQzlEO1lBQ0MsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsd0JBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUU5RCxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNWLEdBQUcsRUFBRSxtQkFBVyxDQUFDLFdBQVc7Z0JBQzVCLElBQUk7Z0JBQ0osSUFBSSxFQUFFLGdCQUFRLENBQUMsSUFBSTthQUNuQixDQUFDLENBQUE7U0FDRjtJQUVGLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFDakI7WUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVzthQUNuQixDQUFDLENBQUE7U0FDRjtJQUNGLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUN2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QUMsQ0FBQztZQUV2QixPQUFPLElBQUksQ0FBQTtRQUNaLENBQUM7S0FFRCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQTtBQUNaLENBQUM7QUEzREQsa0NBMkRDO0FBRUQsa0JBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluaXRNYWluLCB7IGJ1aWxkQXN5bmMsIGJ1aWxkU3luYyB9IGZyb20gJ2NhbGlicmUtb3Bkcy9saWIvaW5kZXgnO1xuaW1wb3J0IHsgSVNoYXJlZEhhbmRsZXJPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRW51bUxpbmtSZWwsIEVudW1NSU1FIH0gZnJvbSAnb3Bkcy1leHRyYS9saWIvY29uc3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ29wZHMtZXh0cmEvbGliL3YxL2NvcmUnO1xuaW1wb3J0IHsgT1BEU1YxIH0gZnJvbSAnb3Bkcy1leHRyYSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJy4uL21vbWVudCc7XG5pbXBvcnQgeyBJQm9vaywgRW51bURhdGFGb3JtYXRMb3dlckNhc2UsIGdldEZpbGVQYXRoIH0gZnJvbSAnY2FsaWJyZS1kYic7XG5pbXBvcnQgZmlsZWV4dCBmcm9tICdjYWxpYnJlLWRiL2xpYi91dGlscy9maWxlZXh0JztcbmltcG9ydCB7IGdldENvdmVyUGF0aCB9IGZyb20gJ2NhbGlicmUtZGIvbGliL3V0aWxzL2luZGV4JztcbmltcG9ydCBNSU1FVHlwZXMgZnJvbSAnbWltZS10eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRCb29rKGJvb2s6IElCb29rLCBvcHRpb25zOiBJU2hhcmVkSGFuZGxlck9wdGlvbnMsIGFyZ3Y6IHtcblx0ZGJJRDogc3RyaW5nLFxufSlcbntcblx0bGV0IHsgcGF0aFdpdGhQcmVmaXggfSA9IG9wdGlvbnM7XG5cblx0bGV0IGxpbmtzID0gW107XG5cblx0Ym9vay5kYXRhLmZvckVhY2goZmlsZSA9PiB7XG5cblx0XHRpZiAoZmlsZWV4dChmaWxlLmRhdGFfZm9ybWF0KSA9PT0gRW51bURhdGFGb3JtYXRMb3dlckNhc2UuRVBVQilcblx0XHR7XG5cdFx0XHRsZXQgaHJlZiA9IHBhdGhXaXRoUHJlZml4KGFyZ3YuZGJJRCwgZ2V0RmlsZVBhdGgoZmlsZSwgYm9vaykpO1xuXG5cdFx0XHRsaW5rcy5wdXNoKHtcblx0XHRcdFx0cmVsOiBFbnVtTGlua1JlbC5BQ1FVSVNJVElPTixcblx0XHRcdFx0aHJlZixcblx0XHRcdFx0dHlwZTogRW51bU1JTUUuZXB1Yixcblx0XHRcdH0pXG5cdFx0fVxuXG5cdH0pO1xuXG5cdGxldCBhdXRob3JzID0gW107XG5cblx0Ym9vay5hdXRob3JzLmZvckVhY2godiA9PiB7XG5cdFx0aWYgKHYuYXV0aG9yX25hbWUpXG5cdFx0e1xuXHRcdFx0YXV0aG9ycy5wdXNoKHtcblx0XHRcdFx0bmFtZTogdi5hdXRob3JfbmFtZVxuXHRcdFx0fSlcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChib29rLmJvb2tfaGFzX2NvdmVyKVxuXHR7XG5cdFx0bGV0IGhyZWYgPSBwYXRoV2l0aFByZWZpeChhcmd2LmRiSUQsIGdldENvdmVyUGF0aChib29rKSk7XG5cblx0XHRsZXQgdHlwZSA9IE1JTUVUeXBlcy5sb29rdXAoaHJlZik7XG5cblx0XHRsaW5rcy5wdXNoKHtcblx0XHRcdHJlbDogRW51bUxpbmtSZWwuSU1BR0UsXG5cdFx0XHRocmVmLFxuXHRcdFx0dHlwZSxcblx0XHR9KTtcblxuXHRcdGxpbmtzLnB1c2goe1xuXHRcdFx0cmVsOiBFbnVtTGlua1JlbC5JTUFHRV9USFVNQk5BSUwsXG5cdFx0XHRocmVmLFxuXHRcdFx0dHlwZSxcblx0XHR9KTtcblx0fVxuXG5cdC8vY29uc29sZS5kaXIoYm9vaylcblxuXHRyZXR1cm4gT1BEU1YxLkVudHJ5LmRlc2VyaWFsaXplPE9QRFNWMS5FbnRyeT4oe1xuXHRcdHRpdGxlOiBib29rLmJvb2tfdGl0bGUsXG5cdFx0bGlua3MsXG5cdFx0dXBkYXRlZDogbW9tZW50KGJvb2suYm9va19kYXRlKS5mb3JtYXQoKSxcblx0XHRzdW1tYXJ5OiBib29rLmNvbW1lbnQsXG5cdFx0YXV0aG9ycyxcblx0fSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZE9QRFNJRChvcHRpb25zOiBJU2hhcmVkSGFuZGxlck9wdGlvbnMsIGFyZ3Y6IHtcblx0ZGJJRDogc3RyaW5nLFxufSlcbntcblx0bGV0IHsgZGJMaXN0IH0gPSBvcHRpb25zO1xuXG5cdGxldCBkYiA9IGF3YWl0IGRiTGlzdFthcmd2LmRiSURdLmxhenlsb2FkKCk7XG5cblx0bGV0IGZlZWQgPSBhd2FpdCBidWlsZEFzeW5jKGluaXRNYWluKHtcblx0XHR0aXRsZTogYOabuOW6q++8miR7ZGJMaXN0W2FyZ3YuZGJJRF0ubmFtZX1gLFxuXHRcdHN1YnRpdGxlOiBg5pu45bqr77yaJHtkYkxpc3RbYXJndi5kYklEXS5uYW1lfWAsXG5cdFx0aWNvbjogJy9mYXZpY29uLmljbycsXG5cdH0pLCBbXG5cblx0XHQoZmVlZCkgPT5cblx0XHR7XG5cdFx0XHRmZWVkLmJvb2tzID0gZmVlZC5ib29rcyB8fCBbXTtcblxuXHRcdFx0T2JqZWN0LmVudHJpZXMoZGJMaXN0KVxuXHRcdFx0XHQuZm9yRWFjaCgoW2lkLCByb3ddKSA9PiB7XG5cblx0XHRcdFx0XHRpZiAoYXJndi5kYklEID09IHJvdy5pZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZmVlZC5ib29rcy5wdXNoKE9QRFNWMS5FbnRyeS5kZXNlcmlhbGl6ZTxPUERTVjEuRW50cnk+KHtcblx0XHRcdFx0XHRcdHRpdGxlOiBg5pu45bqr77yaJHtyb3cubmFtZX1gLFxuXHRcdFx0XHRcdFx0bGlua3M6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGhyZWY6IG9wdGlvbnMucGF0aFdpdGhQcmVmaXgocm93LmlkLCAnb3BkcycpLFxuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBFbnVtTGlua1JlbC5BTFRFUk5BVEUsXG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogRW51bU1JTUUuT1BEU19DQVRBTE9HX0ZFRURfRE9DVU1FTlQsXG5cdFx0XHRcdFx0XHRcdH0gYXMgTGlua1xuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHR9KVxuXHRcdFx0O1xuXG5cdFx0XHRyZXR1cm4gZmVlZFxuXHRcdH0sXG5cblx0XHRhc3luYyAoZmVlZCkgPT5cblx0XHR7XG5cdFx0XHRmZWVkLmJvb2tzID0gZmVlZC5ib29rcyB8fCBbXTtcblxuXHRcdFx0bGV0IGxzID0gYXdhaXQgZGIuZ2V0Qm9va3MoKVxuXHRcdFx0XHQubWFwKGJvb2sgPT4gYWRkQm9vayhib29rLCBvcHRpb25zLCBhcmd2KSlcblx0XHRcdDtcblxuXHRcdFx0ZmVlZC5ib29rcy5wdXNoKC4uLmxzKTtcblxuXHRcdFx0cmV0dXJuIGZlZWRcblx0XHR9LFxuXG5cdF0pO1xuXG5cdHJldHVybiBmZWVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkT1BEU0lEXG4iXX0=