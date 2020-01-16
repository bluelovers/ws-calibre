"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("calibre-opds/lib/index"));
const const_1 = require("opds-extra/lib/const");
const opds_extra_1 = require("opds-extra");
function buildOPDSIndex(options) {
    let { dbList } = options;
    let feed = index_1.buildSync(index_1.default({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxnRUFBeUU7QUFFekUsZ0RBQTZEO0FBRTdELDJDQUFvQztBQUdwQyxTQUFnQixjQUFjLENBQUMsT0FBOEI7SUFFNUQsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUV6QixJQUFJLElBQUksR0FBRyxpQkFBUyxDQUFDLGVBQVEsQ0FBQztRQUM3QixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVM7UUFDeEIsUUFBUSxFQUFFLFlBQVk7UUFDdEIsSUFBSSxFQUFFLGNBQWM7S0FDcEIsQ0FBQyxFQUFFO1FBRUgsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUVSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFFOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQ3BCLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUU7Z0JBRXRCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBZTtvQkFDdEQsS0FBSyxFQUFFLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDdkIsS0FBSyxFQUFFO3dCQUNOOzRCQUNDLElBQUksRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDOzRCQUM1QyxLQUFLLEVBQUUsbUJBQVcsQ0FBQyxTQUFTOzRCQUM1QixJQUFJLEVBQUUsZ0JBQVEsQ0FBQywwQkFBMEI7eUJBQ2pDO3FCQUNUO2lCQUNELENBQUMsQ0FBQyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQ0Y7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNaLENBQUM7S0FFRCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQTtBQUNaLENBQUM7QUFyQ0Qsd0NBcUNDO0FBRUQsa0JBQWUsY0FBYyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluaXRNYWluLCB7IGJ1aWxkQXN5bmMsIGJ1aWxkU3luYyB9IGZyb20gJ2NhbGlicmUtb3Bkcy9saWIvaW5kZXgnO1xuaW1wb3J0IHsgSVNoYXJlZEhhbmRsZXJPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRW51bUxpbmtSZWwsIEVudW1NSU1FIH0gZnJvbSAnb3Bkcy1leHRyYS9saWIvY29uc3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ29wZHMtZXh0cmEvbGliL3YxL2NvcmUnO1xuaW1wb3J0IHsgT1BEU1YxIH0gZnJvbSAnb3Bkcy1leHRyYSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJy4uL21vbWVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE9QRFNJbmRleChvcHRpb25zOiBJU2hhcmVkSGFuZGxlck9wdGlvbnMpXG57XG5cdGxldCB7IGRiTGlzdCB9ID0gb3B0aW9ucztcblxuXHRsZXQgZmVlZCA9IGJ1aWxkU3luYyhpbml0TWFpbih7XG5cdFx0dGl0bGU6IG9wdGlvbnMuc2l0ZVRpdGxlLFxuXHRcdHN1YnRpdGxlOiBgQ2FsaWJyZSDmm7jluqtgLFxuXHRcdGljb246ICcvZmF2aWNvbi5pY28nLFxuXHR9KSwgW1xuXG5cdFx0KGZlZWQpID0+XG5cdFx0e1xuXHRcdFx0ZmVlZC5ib29rcyA9IGZlZWQuYm9va3MgfHwgW107XG5cblx0XHRcdE9iamVjdC5lbnRyaWVzKGRiTGlzdClcblx0XHRcdFx0LmZvckVhY2goKFtpZCwgcm93XSkgPT4ge1xuXG5cdFx0XHRcdFx0ZmVlZC5ib29rcy5wdXNoKE9QRFNWMS5FbnRyeS5kZXNlcmlhbGl6ZTxPUERTVjEuRW50cnk+KHtcblx0XHRcdFx0XHRcdHRpdGxlOiBg5pu45bqr77yaJHtyb3cubmFtZX1gLFxuXHRcdFx0XHRcdFx0bGlua3M6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGhyZWY6IG9wdGlvbnMucGF0aFdpdGhQcmVmaXgocm93LmlkLCAnb3BkcycpLFxuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBFbnVtTGlua1JlbC5BTFRFUk5BVEUsXG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogRW51bU1JTUUuT1BEU19DQVRBTE9HX0ZFRURfRE9DVU1FTlQsXG5cdFx0XHRcdFx0XHRcdH0gYXMgTGlua1xuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHR9KVxuXHRcdFx0O1xuXG5cdFx0XHRyZXR1cm4gZmVlZFxuXHRcdH0sXG5cblx0XSk7XG5cblx0cmV0dXJuIGZlZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRPUERTSW5kZXhcbiJdfQ==