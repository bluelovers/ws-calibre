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
        return new bluebird_1.default(function (resolve, reject) {
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
            .where(where, value)
            .order('book_id', false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFrRDtBQUNsRCwyQ0FBd0M7QUFDeEMsa0VBQXdEO0FBQ3hELDhEQUFzQztBQUN0QyxzRkFBOEQ7QUFHOUQsd0RBQWdDO0FBRWhDLE1BQWEsRUFBRTtJQUtkLFlBQStCLEtBQWEsRUFBcUIsS0FBYSxFQUFxQixHQUFhO1FBQWpGLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBcUIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFxQixRQUFHLEdBQUgsR0FBRyxDQUFVO1FBSHRHLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFNbEMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFnQjtRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFlO1FBRXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxTQUFTO1FBRVIsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQTtJQUMvQixDQUFDO0lBRUQsR0FBRyxDQUFJLEtBQVE7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDaEI7WUFDQyxPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELEtBQUssQ0FBSSxLQUFRO1FBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNoQjtZQUNDLE9BQU87U0FDUDtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsRUFBRTtRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSTtRQUVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTyxDQUFJLFNBQWlCO1FBRTNCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLGtCQUFRLENBQU0sVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUVqRCxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBUztnQkFFNUMsSUFBSSxHQUFHLEVBQ1A7b0JBQUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNoQjtvQkFDQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25CO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2YsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsSUFBZTtRQUV2QixNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLG1CQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFO2FBQy9CLFVBQVUsRUFBRTthQUNaLFNBQVMsRUFBRTthQUNYLE9BQU8sRUFBRTthQUNULFNBQVMsRUFBRTthQUNYLE9BQU8sRUFBRTthQUNULGNBQWMsRUFBRTthQUNoQixXQUFXLEVBQUU7YUFDYixLQUFLLEVBQUU7YUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2IsS0FBSyxDQUFDLFlBQVksQ0FBQzthQUNuQixLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQzthQUNuQixLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUN4QjtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBUSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLO1lBRXpELE1BQU0sUUFBUSxHQUFHLGlCQUFPLENBQ3ZCLDZCQUFtQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQ3pDLDZCQUFtQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQ2pELDZCQUFtQixDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQ2hELDZCQUFtQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQzlDLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQWM7UUFFckIsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxtQkFBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLEVBQUU7YUFDL0IsUUFBUSxpQkFBcUI7YUFDN0IsU0FBUyxFQUFFO2FBQ1gsaUJBQWlCLEVBQUU7YUFDbkIsS0FBSyxFQUFFO2FBQ1AsSUFBSSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQzthQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFPLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU07WUFFekQsTUFBTSxRQUFRLEdBQUcsNkJBQW1CLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNoRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWlCO1FBRTFCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsbUJBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFO2FBQy9CLFFBQVEsdUJBQXdCO2FBQ2hDLFlBQVksRUFBRTthQUNkLG9CQUFvQixFQUFFO2FBQ3RCLEtBQUssRUFBRTthQUNQLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDZCxLQUFLLENBQUMsYUFBYSxDQUFDO2FBQ3BCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFVLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU07WUFFNUQsTUFBTSxRQUFRLEdBQUcsNkJBQW1CLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNoRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWlCO1FBRTNCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsbUJBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFO1lBQ2hDLGVBQWU7YUFDZCxRQUFRLEVBQUU7YUFDVixTQUFTLEVBQUU7YUFDWCxtQkFBbUIsRUFBRTthQUNyQixZQUFZLEVBQUU7WUFDZixpQkFBaUI7WUFDakIsY0FBYztZQUNkLGlCQUFpQjthQUNoQixtQkFBbUIsRUFBRTthQUNyQixvQkFBb0IsRUFBRTthQUN0QixLQUFLLEVBQUU7YUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2YsS0FBSyxDQUFDLGFBQWEsQ0FBQzthQUNwQixLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBVSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxPQUFPO1lBRTdELE1BQU0sUUFBUSxHQUFHLGlCQUFPLENBQ3ZCLDZCQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQzdDLDZCQUFtQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQ3BELENBQUM7WUFDRixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFJLFNBQVk7UUFFdkIsT0FBTztZQUNOLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztZQUNoQixJQUFJLEVBQUUsVUFBbUI7WUFDekIsU0FBUztTQUNULENBQUM7SUFDSCxDQUFDO0NBRUQ7QUE3TEQsZ0JBNkxDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLElBQVksRUFBRSxJQUFZO0lBRWxELE9BQU8sSUFBSSxrQkFBUSxDQUFLLFVBQVUsT0FBTyxFQUFFLE1BQU07UUFFaEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxrQkFBUSxDQUFDLElBQUksRUFBRSx1QkFBYSxFQUFFLFVBQVUsR0FBRztZQUV6RCxJQUFJLEdBQUcsRUFDUDtnQkFDQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQjtZQUVELE1BQU0sS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNILENBQUM7QUFmRCw0QkFlQztBQUVELGtCQUFlLFFBQVEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFiYXNlLCBPUEVOX1JFQURPTkxZIH0gZnJvbSAnc3FsaXRlMyc7XG5pbXBvcnQgeyBTdGF0ZW1lbnQgfSBmcm9tICcuL1N0YXRlbWVudCc7XG5pbXBvcnQgbWFrZVdoZXJlLCB7IElMb2NhdG9yIH0gZnJvbSAnLi91dGlscy9tYWtlV2hlcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi91dGlscy9jb21wb3NlJztcbmltcG9ydCBwcm9wZXJ0aWVzQ29sbGFwc2VyIGZyb20gJy4vdXRpbHMvcHJvcGVydGllc0NvbGxhcHNlcic7XG5pbXBvcnQgeyBFbnVtQm9va3NGaWx0ZXIsIElCb29rLCBJQXV0aG9yLCBJU2VyaWVzLCBJVGFnIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICdzcXVlbCc7XG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgY2xhc3MgREJcbntcblx0cHJvdGVjdGVkIF9kZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuXHRwcm90ZWN0ZWQgX2xvZ2dlcjogQ29uc29sZTtcblxuXHRjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgX25hbWU6IHN0cmluZywgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXRoOiBzdHJpbmcsIHByb3RlY3RlZCByZWFkb25seSBfZGI6IERhdGFiYXNlKVxuXHR7XG5cblx0fVxuXG5cdGRlYnVnKGRvRGVidWc6IGJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9kZWJ1ZyA9ICEhZG9EZWJ1Zztcblx0fVxuXG5cdGxvZ2dlcihsb2dnZXI6IENvbnNvbGUpXG5cdHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG5cdH1cblxuXHRnZXRMb2dnZXIoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvZ2dlciB8fCBjb25zb2xlXG5cdH1cblxuXHRsb2c8VD4odGhpbmc6IFQpXG5cdHtcblx0XHRpZiAoIXRoaXMuX2RlYnVnKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5nZXRMb2dnZXIoKS5sb2codGhpcy5fbmFtZSwgdGhpbmcpO1xuXHR9XG5cblx0ZXJyb3I8VD4odGhpbmc6IFQpXG5cdHtcblx0XHRpZiAoIXRoaXMuX2RlYnVnKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5nZXRMb2dnZXIoKS5lcnJvcih0aGlzLl9uYW1lLCB0aGluZyk7XG5cdH1cblxuXHRkYigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGI7XG5cdH1cblxuXHRuYW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9uYW1lO1xuXHR9XG5cblx0cGF0aCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGF0aDtcblx0fVxuXG5cdGV4ZWN1dGU8VD4oc3RhdGVtZW50OiBTZWxlY3QpXG5cdHtcblx0XHRjb25zdCBkYiA9IHRoaXMuX2RiO1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdGNvbnN0IHsgdGV4dCwgdmFsdWVzIH0gPSBzdGF0ZW1lbnQudG9QYXJhbSgpO1xuXHRcdHRoaXMubG9nKHN0YXRlbWVudC50b1N0cmluZygpKTtcblx0XHRyZXR1cm4gbmV3IEJsdWViaXJkPFRbXT4oZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdClcblx0XHR7XG5cdFx0XHRkYi5hbGwodGV4dCwgdmFsdWVzLCBmdW5jdGlvbiAoZXJyLCByb3dzOiBUW10pXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChlcnIpXG5cdFx0XHRcdHtyZXR1cm4gcmVqZWN0KGVycik7fVxuXHRcdFx0XHRpZiAoIXJvd3MubGVuZ3RoKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgZXJyID0gbmV3IEVycm9yKCdubyByb3dzJyk7XG5cdFx0XHRcdFx0c2VsZi5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxmLmxvZyhyb3dzKTtcblx0XHRcdFx0cmV0dXJuIHJlc29sdmUocm93cyk7XG5cdFx0XHR9KTtcblxuXHRcdH0pXG5cdH1cblxuXHRnZXRCb29rcyhib29rPzogSUxvY2F0b3IpXG5cdHtcblx0XHRjb25zdCBbd2hlcmUsIHZhbHVlXSA9IG1ha2VXaGVyZSgnYm9vaycsIGJvb2ssICd0aXRsZScsICdfJyk7XG5cdFx0Y29uc3Qgc3RhdGVtZW50ID0gbmV3IFN0YXRlbWVudCgpXG5cdFx0XHQuYm9va0ZpZWxkcygpXG5cdFx0XHQuc3VtQXV0aG9yKClcblx0XHRcdC5zdW1UYWdzKClcblx0XHRcdC5zdW1TZXJpZXMoKVxuXHRcdFx0LnN1bURhdGEoKVxuXHRcdFx0LmFwcGVuZENvbW1lbnRzKClcblx0XHRcdC5jb21tZW50VGFncygpXG5cdFx0XHQucXVlcnkoKVxuXHRcdFx0LmZyb20oJ2Jvb2tzJylcblx0XHRcdC5ncm91cCgnYm9va190aXRsZScpXG5cdFx0XHQud2hlcmUod2hlcmUsIHZhbHVlKVxuXHRcdFx0Lm9yZGVyKCdib29rX2lkJywgZmFsc2UpXG5cdFx0O1xuXG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZTxJQm9vaz4oc3RhdGVtZW50KS50aGVuKGZ1bmN0aW9uIChib29rcylcblx0XHR7XG5cdFx0XHRjb25zdCBjb2xsYXBzZSA9IGNvbXBvc2U8SUJvb2s+KFxuXHRcdFx0XHRwcm9wZXJ0aWVzQ29sbGFwc2VyKGJvb2tzLCAndGFncycsIC9edGFnXy8pXG5cdFx0XHRcdCwgcHJvcGVydGllc0NvbGxhcHNlcihib29rcywgJ2F1dGhvcnMnLCAvXmF1dGhvcl8vKVxuXHRcdFx0XHQsIHByb3BlcnRpZXNDb2xsYXBzZXIoYm9va3MsICdzZXJpZXMnLCAvXnNlcmllc18vKVxuXHRcdFx0XHQsIHByb3BlcnRpZXNDb2xsYXBzZXIoYm9va3MsICdkYXRhJywgL15kYXRhXy8pLFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBib29rcy5tYXAoY29sbGFwc2UpO1xuXHRcdH0pXG5cdH1cblxuXHRnZXRUYWdzKHRhZz86IElMb2NhdG9yKVxuXHR7XG5cdFx0Y29uc3QgW3doZXJlLCB2YWx1ZV0gPSBtYWtlV2hlcmUoJ3RhZ3MnLCB0YWcpO1xuXHRcdGNvbnN0IHN0YXRlbWVudCA9IG5ldyBTdGF0ZW1lbnQoKVxuXHRcdFx0LnN1bUJvb2tzKEVudW1Cb29rc0ZpbHRlci50YWcpXG5cdFx0XHQudGFnRmllbGRzKClcblx0XHRcdC5hcHBlbmRCb29rRnJvbVRhZygpXG5cdFx0XHQucXVlcnkoKVxuXHRcdFx0LmZyb20oJ3RhZ19icm93c2VyX3RhZ3MnLCAndGFncycpXG5cdFx0XHQuZ3JvdXAoJ3RhZ3MubmFtZScpXG5cdFx0XHQud2hlcmUod2hlcmUsIHZhbHVlKVxuXHRcdDtcblx0XHRyZXR1cm4gdGhpcy5leGVjdXRlPElUYWc+KHN0YXRlbWVudCkudGhlbihmdW5jdGlvbiAoc2VyaWVzKVxuXHRcdHtcblx0XHRcdGNvbnN0IGNvbGxhcHNlID0gcHJvcGVydGllc0NvbGxhcHNlcihzZXJpZXMsICdib29rcycsIC9eYm9va18vKTtcblx0XHRcdHJldHVybiBzZXJpZXMubWFwKGNvbGxhcHNlKTtcblx0XHR9KVxuXHR9XG5cblx0Z2V0U2VyaWVzKHNlcmllcz86IElMb2NhdG9yKVxuXHR7XG5cdFx0Y29uc3QgW3doZXJlLCB2YWx1ZV0gPSBtYWtlV2hlcmUoJ3NlcmllcycsIHNlcmllcyk7XG5cdFx0Y29uc3Qgc3RhdGVtZW50ID0gbmV3IFN0YXRlbWVudCgpXG5cdFx0XHQuc3VtQm9va3MoRW51bUJvb2tzRmlsdGVyLnNlcmllcylcblx0XHRcdC5zZXJpZXNGaWVsZHMoKVxuXHRcdFx0LmFwcGVuZEJvb2tGcm9tU2VyaWVzKClcblx0XHRcdC5xdWVyeSgpXG5cdFx0XHQuZnJvbSgnc2VyaWVzJylcblx0XHRcdC5ncm91cCgnc2VyaWVzLm5hbWUnKVxuXHRcdFx0LndoZXJlKHdoZXJlLCB2YWx1ZSlcblx0XHQ7XG5cdFx0cmV0dXJuIHRoaXMuZXhlY3V0ZTxJU2VyaWVzPihzdGF0ZW1lbnQpLnRoZW4oZnVuY3Rpb24gKHNlcmllcylcblx0XHR7XG5cdFx0XHRjb25zdCBjb2xsYXBzZSA9IHByb3BlcnRpZXNDb2xsYXBzZXIoc2VyaWVzLCAnYm9va3MnLCAvXmJvb2tfLyk7XG5cdFx0XHRyZXR1cm4gc2VyaWVzLm1hcChjb2xsYXBzZSk7XG5cdFx0fSlcblx0fVxuXG5cdGdldEF1dGhvcnMoYXV0aG9yPzogSUxvY2F0b3IpXG5cdHtcblx0XHRjb25zdCBbd2hlcmUsIHZhbHVlXSA9IG1ha2VXaGVyZSgnYXV0aG9ycycsIGF1dGhvcik7XG5cdFx0Y29uc3Qgc3RhdGVtZW50ID0gbmV3IFN0YXRlbWVudCgpXG5cdFx0XHQvLy5ib29rRmllbGRzKClcblx0XHRcdC5zdW1Cb29rcygpXG5cdFx0XHQuc3VtU2VyaWVzKClcblx0XHRcdC5hdXRob3JCcm93c2VyRmllbGRzKClcblx0XHRcdC5hdXRob3JGaWVsZHMoKVxuXHRcdFx0Ly8uc2VyaWVzRmllbGRzKClcblx0XHRcdC8vLnN1bVNlcmllcygpXG5cdFx0XHQvLy5hcHBlbmRTZXJpZXMoKVxuXHRcdFx0LmFwcGVuZEF1dGhvckJyb3dzZXIoKVxuXHRcdFx0LmFwcGVuZEJvb2tGcm9tQXV0aG9yKClcblx0XHRcdC5xdWVyeSgpXG5cdFx0XHQuZnJvbSgnYXV0aG9ycycpXG5cdFx0XHQuZ3JvdXAoJ2F1dGhvcl9uYW1lJylcblx0XHRcdC53aGVyZSh3aGVyZSwgdmFsdWUpXG5cdFx0O1xuXHRcdHJldHVybiB0aGlzLmV4ZWN1dGU8SUF1dGhvcj4oc3RhdGVtZW50KS50aGVuKGZ1bmN0aW9uIChhdXRob3JzKVxuXHRcdHtcblx0XHRcdGNvbnN0IGNvbGxhcHNlID0gY29tcG9zZShcblx0XHRcdFx0cHJvcGVydGllc0NvbGxhcHNlcihhdXRob3JzLCAnYm9va3MnLCAvXmJvb2tfLylcblx0XHRcdFx0LCBwcm9wZXJ0aWVzQ29sbGFwc2VyKGF1dGhvcnMsICdzZXJpZXMnLCAvXnNlcmllc18vKSxcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gYXV0aG9ycy5tYXAoY29sbGFwc2UpO1xuXHRcdH0pXG5cdH1cblxuXHRlbmRwb2ludDxUPihlbmRQb2ludHM6IFQpXG5cdHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bmFtZTogdGhpcy5fbmFtZSxcblx0XHRcdHR5cGU6ICdkYXRhYmFzZScgYXMgY29uc3QsXG5cdFx0XHRlbmRQb2ludHMsXG5cdFx0fTtcblx0fVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEQihuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZylcbntcblx0cmV0dXJuIG5ldyBCbHVlYmlyZDxEQj4oZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdClcblx0e1xuXHRcdGNvbnN0IGRiID0gbmV3IERhdGFiYXNlKHBhdGgsIE9QRU5fUkVBRE9OTFksIGZ1bmN0aW9uIChlcnIpXG5cdFx0e1xuXHRcdFx0aWYgKGVycilcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBRdWVyeSA9IG5ldyBEQihuYW1lLCBwYXRoLCBkYik7XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZShRdWVyeSk7XG5cdFx0fSk7XG5cdH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURCXG4iXX0=