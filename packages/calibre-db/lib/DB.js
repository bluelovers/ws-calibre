"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDB = exports.DB = void 0;
const tslib_1 = require("tslib");
const sqlite3_1 = require("sqlite3");
const Statement_1 = require("./Statement");
const makeWhere_1 = (0, tslib_1.__importDefault)(require("./utils/makeWhere"));
const compose_1 = (0, tslib_1.__importDefault)(require("./utils/compose"));
const propertiesCollapser_1 = (0, tslib_1.__importDefault)(require("./utils/propertiesCollapser"));
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
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
        const [where, value] = (0, makeWhere_1.default)('book', book, 'title', '_');
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
            //.group('book_title')
            .where(where, value)
            .order('book_id', false);
        return this.execute(statement).then(function (books) {
            const collapse = (0, compose_1.default)((0, propertiesCollapser_1.default)(books, 'tags', /^tag_/), (0, propertiesCollapser_1.default)(books, 'authors', /^author_/), (0, propertiesCollapser_1.default)(books, 'series', /^series_/), (0, propertiesCollapser_1.default)(books, 'data', /^data_/));
            return books.map(collapse);
        });
    }
    getTags(tag) {
        const [where, value] = (0, makeWhere_1.default)('tags', tag);
        const statement = new Statement_1.Statement()
            .sumBooks("tag" /* tag */)
            .tagFields()
            .appendBookFromTag()
            .query()
            .from('tag_browser_tags', 'tags')
            .group('tags.name')
            .where(where, value);
        return this.execute(statement).then(function (series) {
            const collapse = (0, propertiesCollapser_1.default)(series, 'books', /^book_/);
            return series.map(collapse);
        });
    }
    getSeries(series) {
        const [where, value] = (0, makeWhere_1.default)('series', series);
        const statement = new Statement_1.Statement()
            .sumBooks("series" /* series */)
            .seriesFields()
            .appendBookFromSeries()
            .query()
            .from('series')
            .group('series.name')
            .where(where, value);
        return this.execute(statement).then(function (series) {
            const collapse = (0, propertiesCollapser_1.default)(series, 'books', /^book_/);
            return series.map(collapse);
        });
    }
    getAuthors(author) {
        const [where, value] = (0, makeWhere_1.default)('authors', author);
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
            const collapse = (0, compose_1.default)((0, propertiesCollapser_1.default)(authors, 'books', /^book_/), (0, propertiesCollapser_1.default)(authors, 'series', /^series_/));
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
//# sourceMappingURL=DB.js.map