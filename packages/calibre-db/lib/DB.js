"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const Statement_1 = require("./Statement");
const makeWhere_1 = __importDefault(require("./utils/makeWhere"));
const compose_1 = __importDefault(require("./utils/compose"));
const propertiesCollapser_1 = __importDefault(require("./utils/propertiesCollapser"));
const bluebird_1 = __importDefault(require("bluebird"));
class DB {
    constructor(_name, _path, _db) {
        this._name = _name;
        this._path = _path;
        this._db = _db;
        this._debug = false;
    }
    debug(doDebug) {
        this._debug = !!doDebug;
    }
    logger(logger) {
        this._logger = logger;
    }
    getLogger() {
        return this._logger || console;
    }
    log(thing) {
        if (!this._debug) {
            return;
        }
        this.getLogger().log(this._name, thing);
    }
    error(thing) {
        if (!this._debug) {
            return;
        }
        this.getLogger().error(this._name, thing);
    }
    db() {
        return this._db;
    }
    name() {
        return this._name;
    }
    path() {
        return this._path;
    }
    execute(statement) {
        const db = this._db;
        const self = this;
        const { text, values } = statement.toParam();
        this.log(statement.toString());
        return new Promise(function (resolve, reject) {
            db.all(text, values, function (err, rows) {
                if (err) {
                    return reject(err);
                }
                if (!rows.length) {
                    const err = new Error('no rows');
                    self.error(err);
                    return reject(err);
                }
                self.log(rows);
                return resolve(rows);
            });
        });
    }
    getBooks(book) {
        const [where, value] = makeWhere_1.default('book', book, 'title', '_');
        const statement = new Statement_1.Statement()
            .bookFields()
            .sumAuthor()
            .sumTags()
            .sumSeries()
            .sumData()
            .appendComments()
            .commentTags()
            .query()
            .from('books')
            .group('book_title')
            .where(where, value);
        return this.execute(statement).then(function (books) {
            const collapse = compose_1.default(propertiesCollapser_1.default(books, 'tags', /^tag_/), propertiesCollapser_1.default(books, 'authors', /^author_/), propertiesCollapser_1.default(books, 'series', /^series_/), propertiesCollapser_1.default(books, 'data', /^data_/));
            return books.map(collapse);
        });
    }
    getTags(tag) {
        const [where, value] = makeWhere_1.default('tags', tag);
        const statement = new Statement_1.Statement()
            .sumBooks("tag" /* tag */)
            .tagFields()
            .appendBookFromTag()
            .query()
            .from('tag_browser_tags', 'tags')
            .group('tags.name')
            .where(where, value);
        return this.execute(statement).then(function (series) {
            const collapse = propertiesCollapser_1.default(series, 'books', /^book_/);
            return series.map(collapse);
        });
    }
    getSeries(series) {
        const [where, value] = makeWhere_1.default('series', series);
        const statement = new Statement_1.Statement()
            .sumBooks("series" /* series */)
            .seriesFields()
            .appendBookFromSeries()
            .query()
            .from('series')
            .group('series.name')
            .where(where, value);
        return this.execute(statement).then(function (series) {
            const collapse = propertiesCollapser_1.default(series, 'books', /^book_/);
            return series.map(collapse);
        });
    }
    getAuthors(author) {
        const [where, value] = makeWhere_1.default('authors', author);
        const statement = new Statement_1.Statement()
            //.bookFields()
            .sumBooks()
            .sumSeries()
            .authorBrowserFields()
            .authorFields()
            //.seriesFields()
            //.sumSeries()
            //.appendSeries()
            .appendAuthorBrowser()
            .appendBookFromAuthor()
            .query()
            .from('authors')
            .group('author_name')
            .where(where, value);
        return this.execute(statement).then(function (authors) {
            const collapse = compose_1.default(propertiesCollapser_1.default(authors, 'books', /^book_/), propertiesCollapser_1.default(authors, 'series', /^series_/));
            return authors.map(collapse);
        });
    }
    endpoint(endPoints) {
        return {
            name: this._name,
            type: 'database',
            endPoints,
        };
    }
}
exports.DB = DB;
function createDB(name, path) {
    return new bluebird_1.default(function (resolve, reject) {
        const db = new sqlite3_1.Database(path, sqlite3_1.OPEN_READONLY, function (err) {
            if (err) {
                return reject(err);
            }
            const Query = new DB(name, path, db);
            return resolve(Query);
        });
    });
}
exports.createDB = createDB;
exports.default = createDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFrRDtBQUNsRCwyQ0FBd0M7QUFDeEMsa0VBQXdEO0FBQ3hELDhEQUFzQztBQUN0QyxzRkFBOEQ7QUFHOUQsd0RBQWdDO0FBRWhDLE1BQWEsRUFBRTtJQUtkLFlBQStCLEtBQWEsRUFBcUIsS0FBYSxFQUFxQixHQUFhO1FBQWpGLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBcUIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFxQixRQUFHLEdBQUgsR0FBRyxDQUFVO1FBSHRHLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFNbEMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFnQjtRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFlO1FBRXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxTQUFTO1FBRVIsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQTtJQUMvQixDQUFDO0lBRUQsR0FBRyxDQUFJLEtBQVE7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDaEI7WUFDQyxPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELEtBQUssQ0FBSSxLQUFRO1FBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNoQjtZQUNDLE9BQU87U0FDUDtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsRUFBRTtRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJ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QUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQWZELDRCQWVDO0FBRUQsa0JBQWUsUUFBUSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YWJhc2UsIE9QRU5fUkVBRE9OTFkgfSBmcm9tICdzcWxpdGUzJztcbmltcG9ydCB7IFN0YXRlbWVudCB9IGZyb20gJy4vU3RhdGVtZW50JztcbmltcG9ydCBtYWtlV2hlcmUsIHsgSUxvY2F0b3IgfSBmcm9tICcuL3V0aWxzL21ha2VXaGVyZSc7XG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL3V0aWxzL2NvbXBvc2UnO1xuaW1wb3J0IHByb3BlcnRpZXNDb2xsYXBzZXIgZnJvbSAnLi91dGlscy9wcm9wZXJ0aWVzQ29sbGFwc2VyJztcbmltcG9ydCB7IEVudW1Cb29rc0ZpbHRlciwgSUJvb2ssIElBdXRob3IsIElTZXJpZXMsIElUYWcgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJ3NxdWVsJztcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBjbGFzcyBEQlxue1xuXHRwcm90ZWN0ZWQgX2RlYnVnOiBib29sZWFuID0gZmFsc2U7XG5cdHByb3RlY3RlZCBfbG9nZ2VyOiBDb25zb2xlO1xuXG5cdGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBfbmFtZTogc3RyaW5nLCBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhdGg6IHN0cmluZywgcHJvdGVjdGVkIHJlYWRvbmx5IF9kYjogRGF0YWJhc2UpXG5cdHtcblxuXHR9XG5cblx0ZGVidWcoZG9EZWJ1ZzogYm9vbGVhbilcblx0e1xuXHRcdHRoaXMuX2RlYnVnID0gISFkb0RlYnVnO1xuXHR9XG5cblx0bG9nZ2VyKGxvZ2dlcjogQ29uc29sZSlcblx0e1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcblx0fVxuXG5cdGdldExvZ2dlcigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9nZ2VyIHx8IGNvbnNvbGVcblx0fVxuXG5cdGxvZzxUPih0aGluZzogVClcblx0e1xuXHRcdGlmICghdGhpcy5fZGVidWcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmdldExvZ2dlcigpLmxvZyh0aGlzLl9uYW1lLCB0aGluZyk7XG5cdH1cblxuXHRlcnJvcjxUPih0aGluZzogVClcblx0e1xuXHRcdGlmICghdGhpcy5fZGVidWcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmdldExvZ2dlcigpLmVycm9yKHRoaXMuX25hbWUsIHRoaW5nKTtcblx0fVxuXG5cdGRiKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYjtcblx0fVxuXG5cdG5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX25hbWU7XG5cdH1cblxuXHRwYXRoKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wYXRoO1xuXHR9XG5cblx0ZXhlY3V0ZTxUPihzdGF0ZW1lbnQ6IFNlbGVjdClcblx0e1xuXHRcdGNvbnN0IGRiID0gdGhpcy5fZGI7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Y29uc3QgeyB0ZXh0LCB2YWx1ZXMgfSA9IHN0YXRlbWVudC50b1BhcmFtKCk7XG5cdFx0dGhpcy5sb2coc3RhdGVtZW50LnRvU3RyaW5nKCkpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxUW10+KGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpXG5cdFx0e1xuXHRcdFx0ZGIuYWxsKHRleHQsIHZhbHVlcywgZnVuY3Rpb24gKGVyciwgcm93czogVFtdKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZXJyKVxuXHRcdFx0XHR7cmV0dXJuIHJlamVjdChlcnIpO31cblx0XHRcdFx0aWYgKCFyb3dzLmxlbmd0aClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGVyciA9IG5ldyBFcnJvcignbm8gcm93cycpO1xuXHRcdFx0XHRcdHNlbGYuZXJyb3IoZXJyKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VsZi5sb2cocm93cyk7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKHJvd3MpO1xuXHRcdFx0fSk7XG5cblx0XHR9KVxuXHR9XG5cblx0Z2V0Qm9va3MoYm9vaz86IElMb2NhdG9yKVxuXHR7XG5cdFx0Y29uc3QgW3doZXJlLCB2YWx1ZV0gPSBtYWtlV2hlcmUoJ2Jvb2snLCBib29rLCAndGl0bGUnLCAnXycpO1xuXHRcdGNvbnN0IHN0YXRlbWVudCA9IG5ldyBTdGF0ZW1lbnQoKVxuXHRcdFx0LmJvb2tGaWVsZHMoKVxuXHRcdFx0LnN1bUF1dGhvcigpXG5cdFx0XHQuc3VtVGFncygpXG5cdFx0XHQuc3VtU2VyaWVzKClcblx0XHRcdC5zdW1EYXRhKClcblx0XHRcdC5hcHBlbmRDb21tZW50cygpXG5cdFx0XHQuY29tbWVudFRhZ3MoKVxuXHRcdFx0LnF1ZXJ5KClcblx0XHRcdC5mcm9tKCdib29rcycpXG5cdFx0XHQuZ3JvdXAoJ2Jvb2tfdGl0bGUnKVxuXHRcdFx0LndoZXJlKHdoZXJlLCB2YWx1ZSlcblx0XHQ7XG5cblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlPElCb29rPihzdGF0ZW1lbnQpLnRoZW4oZnVuY3Rpb24gKGJvb2tzKVxuXHRcdHtcblx0XHRcdGNvbnN0IGNvbGxhcHNlID0gY29tcG9zZTxJQm9vaz4oXG5cdFx0XHRcdHByb3BlcnRpZXNDb2xsYXBzZXIoYm9va3MsICd0YWdzJywgL150YWdfLylcblx0XHRcdFx0LCBwcm9wZXJ0aWVzQ29sbGFwc2VyKGJvb2tzLCAnYXV0aG9ycycsIC9eYXV0aG9yXy8pXG5cdFx0XHRcdCwgcHJvcGVydGllc0NvbGxhcHNlcihib29rcywgJ3NlcmllcycsIC9ec2VyaWVzXy8pXG5cdFx0XHRcdCwgcHJvcGVydGllc0NvbGxhcHNlcihib29rcywgJ2RhdGEnLCAvXmRhdGFfLyksXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGJvb2tzLm1hcChjb2xsYXBzZSk7XG5cdFx0fSlcblx0fVxuXG5cdGdldFRhZ3ModGFnPzogSUxvY2F0b3IpXG5cdHtcblx0XHRjb25zdCBbd2hlcmUsIHZhbHVlXSA9IG1ha2VXaGVyZSgndGFncycsIHRhZyk7XG5cdFx0Y29uc3Qgc3RhdGVtZW50ID0gbmV3IFN0YXRlbWVudCgpXG5cdFx0XHQuc3VtQm9va3MoRW51bUJvb2tzRmlsdGVyLnRhZylcblx0XHRcdC50YWdGaWVsZHMoKVxuXHRcdFx0LmFwcGVuZEJvb2tGcm9tVGFnKClcblx0XHRcdC5xdWVyeSgpXG5cdFx0XHQuZnJvbSgndGFnX2Jyb3dzZXJfdGFncycsICd0YWdzJylcblx0XHRcdC5ncm91cCgndGFncy5uYW1lJylcblx0XHRcdC53aGVyZSh3aGVyZSwgdmFsdWUpXG5cdFx0O1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGU8SVRhZz4oc3RhdGVtZW50KS50aGVuKGZ1bmN0aW9uIChzZXJpZXMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgY29sbGFwc2UgPSBwcm9wZXJ0aWVzQ29sbGFwc2VyKHNlcmllcywgJ2Jvb2tzJywgL15ib29rXy8pO1xuXHRcdFx0cmV0dXJuIHNlcmllcy5tYXAoY29sbGFwc2UpO1xuXHRcdH0pXG5cdH1cblxuXHRnZXRTZXJpZXMoc2VyaWVzPzogSUxvY2F0b3IpXG5cdHtcblx0XHRjb25zdCBbd2hlcmUsIHZhbHVlXSA9IG1ha2VXaGVyZSgnc2VyaWVzJywgc2VyaWVzKTtcblx0XHRjb25zdCBzdGF0ZW1lbnQgPSBuZXcgU3RhdGVtZW50KClcblx0XHRcdC5zdW1Cb29rcyhFbnVtQm9va3NGaWx0ZXIuc2VyaWVzKVxuXHRcdFx0LnNlcmllc0ZpZWxkcygpXG5cdFx0XHQuYXBwZW5kQm9va0Zyb21TZXJpZXMoKVxuXHRcdFx0LnF1ZXJ5KClcblx0XHRcdC5mcm9tKCdzZXJpZXMnKVxuXHRcdFx0Lmdyb3VwKCdzZXJpZXMubmFtZScpXG5cdFx0XHQud2hlcmUod2hlcmUsIHZhbHVlKVxuXHRcdDtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlPElTZXJpZXM+KHN0YXRlbWVudCkudGhlbihmdW5jdGlvbiAoc2VyaWVzKVxuXHRcdHtcblx0XHRcdGNvbnN0IGNvbGxhcHNlID0gcHJvcGVydGllc0NvbGxhcHNlcihzZXJpZXMsICdib29rcycsIC9eYm9va18vKTtcblx0XHRcdHJldHVybiBzZXJpZXMubWFwKGNvbGxhcHNlKTtcblx0XHR9KVxuXHR9XG5cblx0Z2V0QXV0aG9ycyhhdXRob3I/OiBJTG9jYXRvcilcblx0e1xuXHRcdGNvbnN0IFt3aGVyZSwgdmFsdWVdID0gbWFrZVdoZXJlKCdhdXRob3JzJywgYXV0aG9yKTtcblx0XHRjb25zdCBzdGF0ZW1lbnQgPSBuZXcgU3RhdGVtZW50KClcblx0XHRcdC8vLmJvb2tGaWVsZHMoKVxuXHRcdFx0LnN1bUJvb2tzKClcblx0XHRcdC5zdW1TZXJpZXMoKVxuXHRcdFx0LmF1dGhvckJyb3dzZXJGaWVsZHMoKVxuXHRcdFx0LmF1dGhvckZpZWxkcygpXG5cdFx0XHQvLy5zZXJpZXNGaWVsZHMoKVxuXHRcdFx0Ly8uc3VtU2VyaWVzKClcblx0XHRcdC8vLmFwcGVuZFNlcmllcygpXG5cdFx0XHQuYXBwZW5kQXV0aG9yQnJvd3NlcigpXG5cdFx0XHQuYXBwZW5kQm9va0Zyb21BdXRob3IoKVxuXHRcdFx0LnF1ZXJ5KClcblx0XHRcdC5mcm9tKCdhdXRob3JzJylcblx0XHRcdC5ncm91cCgnYXV0aG9yX25hbWUnKVxuXHRcdFx0LndoZXJlKHdoZXJlLCB2YWx1ZSlcblx0XHQ7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZTxJQXV0aG9yPihzdGF0ZW1lbnQpLnRoZW4oZnVuY3Rpb24gKGF1dGhvcnMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgY29sbGFwc2UgPSBjb21wb3NlKFxuXHRcdFx0XHRwcm9wZXJ0aWVzQ29sbGFwc2VyKGF1dGhvcnMsICdib29rcycsIC9eYm9va18vKVxuXHRcdFx0XHQsIHByb3BlcnRpZXNDb2xsYXBzZXIoYXV0aG9ycywgJ3NlcmllcycsIC9ec2VyaWVzXy8pLFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBhdXRob3JzLm1hcChjb2xsYXBzZSk7XG5cdFx0fSlcblx0fVxuXG5cdGVuZHBvaW50PFQ+KGVuZFBvaW50czogVClcblx0e1xuXHRcdHJldHVybiB7XG5cdFx0XHRuYW1lOiB0aGlzLl9uYW1lLFxuXHRcdFx0dHlwZTogJ2RhdGFiYXNlJyBhcyBjb25zdCxcblx0XHRcdGVuZFBvaW50cyxcblx0XHR9O1xuXHR9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURCKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nKVxue1xuXHRyZXR1cm4gbmV3IEJsdWViaXJkPERCPihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KVxuXHR7XG5cdFx0Y29uc3QgZGIgPSBuZXcgRGF0YWJhc2UocGF0aCwgT1BFTl9SRUFET05MWSwgZnVuY3Rpb24gKGVycilcblx0XHR7XG5cdFx0XHRpZiAoZXJyKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IFF1ZXJ5ID0gbmV3IERCKG5hbWUsIHBhdGgsIGRiKTtcblx0XHRcdHJldHVybiByZXNvbHZlKFF1ZXJ5KTtcblx0XHR9KTtcblx0fSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlREJcbiJdfQ==