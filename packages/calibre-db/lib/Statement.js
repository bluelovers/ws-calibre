"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const squel_1 = __importDefault(require("squel"));
function _concat(t1, t2, link, prop, fields, sep = '|') {
    const [f1, f2] = fields;
    const c = `${t1}_${prop}`;
    return `(SELECT GROUP_CONCAT(${c}, '${sep}') FROM (SELECT DISTINCT ${t1}.${prop} ${c} FROM ${link} JOIN ${t1} ON ${link}.${f1} = ${t1}.id WHERE ${link}.${f2} = ${t2}.id))`;
}
function concat_simple(t, t2, f, prop, distinct = true) {
    // @ts-ignore
    distinct = (distinct ? ' DISTINCT' : '');
    const c = `${t}_${f}`;
    return `(SELECT GROUP_CONCAT(${c}, '|') FROM (SELECT${distinct} ${t}.${prop} ${c} FROM ${t} WHERE ${t}.${f} = ${t2}.id))`;
}
function concat(f1, f2, prop, dir = false, sep = '|') {
    const t1 = f1.replace(/s$/, '') + 's';
    const t2 = f2.replace(/s$/, '') + 's';
    const link = (dir ? `${t1}_${t2}` : `${t2}_${t1}`) + '_link';
    const fields = [f1, f2];
    return _concat(t1, t2, link, prop, fields, sep);
}
class Statement {
    constructor() {
        this._query = squel_1.default.select({ separator: "\n" });
    }
    bookFields() {
        this._query
            .field('books.id', 'book_id')
            .field('books.title', 'book_title')
            .field('books.sort', 'book_sort')
            .field('books.author_sort', 'author_sort')
            .field('books.has_cover', 'book_has_cover')
            .field('books.pubdate', 'book_date')
            .field('books.path', 'book_path')
            .field('books.isbn', 'book_isbn')
            .field('books.series_index', 'book_series_index')
            .field('books.uuid', 'book_uuid')
            .field('books.timestamp', 'book_timestamp')
            .field('books.last_modified', 'book_last_modified');
        return this;
    }
    authorBrowserFields() {
        this._query
            .field('tag_browser_authors.count', 'authors_books_count');
        return this;
    }
    authorFields() {
        this._query
            .field('authors.id', 'author_id')
            .field('authors.name', 'author_name')
            .field('authors.sort', 'author_sort');
        return this;
    }
    tagFields() {
        this._query
            .field('tags.name', 'tag_name')
            .field('tags.id', 'tag_id')
            .field('tags.count', 'tag_books_count');
        return this;
    }
    seriesFields() {
        this._query
            .field('series.id', 'series_id')
            .field('series.name', 'series_name')
            .field('series.sort', 'series_sort');
        return this;
    }
    sumData() {
        this._query
            .field(concat_simple('data', 'books', 'book', 'id'), 'data_id')
            .field(concat_simple('data', 'books', 'book', 'format'), 'data_format')
            .field(concat_simple('data', 'books', 'book', 'uncompressed_size'), 'data_size')
            .field(concat_simple('data', 'books', 'book', 'name', false), 'data_name');
        //.field("GROUP_CONCAT(DISTINCT data.format)",'data_format')
        //.field("GROUP_CONCAT(DISTINCT data.uncompressed_size)",'data_size')
        //.join('data')
        //.where('data.book = books.id');
        return this;
    }
    sumBooks(_from = "author" /* author */) {
        this._query
            .field(concat('book', _from, 'id', true), 'book_id')
            .field(concat('book', _from, 'title', true), 'book_title')
            .field(concat('book', _from, 'sort', true), 'book_sort')
            .field(concat('book', _from, 'has_cover', true), 'book_has_cover')
            .field(concat('book', _from, 'pubdate', true), 'book_pubdate')
            .field(concat('book', _from, 'path', true), 'book_path')
            .field(concat('book', _from, 'series_index', true), 'book_series_index');
        /*
        .field("GROUP_CONCAT(DISTINCT books.id)",'books_id')
        .field("GROUP_CONCAT(DISTINCT books.title)",'books_name')
        .field("GROUP_CONCAT(DISTINCT books.sort)",'books_sort')
        .field("GROUP_CONCAT(DISTINCT books.has_cover)",'books_has_cover')
        .field("GROUP_CONCAT(DISTINCT books.pubdate)",'books_pubdate')
        .field("GROUP_CONCAT(DISTINCT books.path)",'books_path')
        .field("GROUP_CONCAT(DISTINCT books.series_index)",'books_series_index')
        */
        return this;
    }
    sumSeries() {
        this._query
            .field(concat('series', 'book', 'id'), 'series_id')
            .field(concat('series', 'book', 'name'), 'series_name')
            .field(concat('series', 'book', 'sort'), 'series_sort');
        /*
        .field("GROUP_CONCAT(DISTINCT series.id)",'series_id')
        .field("GROUP_CONCAT(DISTINCT series.name)",'series_name')
        .field("GROUP_CONCAT(DISTINCT series.sort)",'series_sort')
        */
        return this;
    }
    sumTags() {
        this._query
            //.field('tags.name','tag_names')
            .field(concat('tag', 'book', 'id'), 'tag_id')
            .field(concat('tag', 'book', 'name'), 'tag_name');
        return this;
    }
    sumAuthor() {
        this._query
            .field(concat('author', 'book', 'id'), 'author_id')
            .field(concat('author', 'book', 'name'), 'author_name')
            .field(concat('author', 'book', 'sort'), 'author_sort');
        return this;
    }
    commentTags() {
        this._query
            .field('comments.text', 'comment');
        return this;
    }
    appendComments() {
        this._query
            .left_join('comments', null, 'comments.book = books.id');
        return this;
    }
    appendSeries() {
        this._query
            .join('books_series_link', null, 'books_series_link.book = books.id')
            .join('series', null, 'series.id = books_series_link.series');
        return this;
    }
    appendBookFromTag() {
        this._query
            .join('books_tags_link', null, 'books_tags_link.tag = tags.id')
            .join('books', null, 'books.id = books_tags_link.book');
        return this;
    }
    appendBookFromSeries() {
        this._query
            .left_join('books_series_link', null, 'books_series_link.series = series.id')
            .left_join('books', null, 'books.id = books_series_link.book');
        return this;
    }
    appendBookFromAuthor() {
        this._query
            .join('books_authors_link', null, 'books_authors_link.author = authors.id')
            .join('books', null, 'books.id = books_authors_link.book');
        return this;
    }
    appendTagFromBook() {
        this._query
            .join('books_tags_link', null, 'books_tags_link.book = books.id')
            .join('tags', null, 'tags.id = books_tags_link.tag');
        return this;
    }
    appendAuthorFromBook() {
        this._query
            //.left_join('comments',null,'comments.book = books.id')
            .field('authors.name', 'author_name')
            .join('books_authors_link', null, 'books_authors_link.book = books.id')
            .join('authors', null, 'authors.id = books_authors_link.author');
        return this;
    }
    appendAuthorBrowser() {
        this._query
            .join('tag_browser_authors', null, 'tag_browser_authors.id = authors.id');
        return this;
    }
    toString() {
        return this._query.toString();
    }
    query() {
        return this._query;
    }
}
exports.Statement = Statement;
function makeStatement() {
    return new Statement();
}
exports.makeStatement = makeStatement;
exports.default = makeStatement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3RhdGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQW9EO0FBR3BELFNBQVMsT0FBTyxDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxNQUFnQixFQUFFLEdBQUcsR0FBRyxHQUFHO0lBRS9GLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzFCLE9BQU8sd0JBQXdCLENBQUMsTUFBTSxHQUFHLDRCQUE0QixFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLElBQUksSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDN0ssQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLENBQVMsRUFBRSxFQUFVLEVBQUUsQ0FBUyxFQUFFLElBQVksRUFBRSxRQUFRLEdBQUcsSUFBSTtJQUVyRixhQUFhO0lBQ2IsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3RCLE9BQU8sd0JBQXdCLENBQUMsc0JBQXNCLFFBQVEsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUMzSCxDQUFDO0FBRUQsU0FBUyxNQUFNLENBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFHLEdBQUcsR0FBRztJQUVu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TTthQUNULElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsaUNBQWlDLENBQUM7YUFDaEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsK0JBQStCLENBQUMsQ0FBQTtRQUNyRCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxvQkFBb0I7UUFFbkIsSUFBSSxDQUFDLE1BQU07WUFDVix3REFBd0Q7YUFDdkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUM7YUFDcEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxvQ0FBb0MsQ0FBQzthQUN0RSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSx3Q0FBd0MsQ0FBQyxDQUFBO1FBQ2pFLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELG1CQUFtQjtRQUVsQixJQUFJLENBQUMsTUFBTTthQUNULElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUUscUNBQXFDLENBQUMsQ0FBQTtRQUMxRSxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxRQUFRO1FBRVAsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxLQUFLO1FBRUosT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3BCLENBQUM7Q0FDRDtBQWxORCw4QkFrTkM7QUFFRCxTQUFnQixhQUFhO0lBRTVCLE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUN4QixDQUFDO0FBSEQsc0NBR0M7QUFFRCxrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3F1ZWwsIHsgUXVlcnlCdWlsZGVyLCBTZWxlY3QgfSBmcm9tIFwic3F1ZWxcIjtcbmltcG9ydCB7IEVudW1Cb29rc0ZpbHRlciB9IGZyb20gJy4vdHlwZXMnO1xuXG5mdW5jdGlvbiBfY29uY2F0KHQxOiBzdHJpbmcsIHQyOiBzdHJpbmcsIGxpbms6IHN0cmluZywgcHJvcDogc3RyaW5nLCBmaWVsZHM6IHN0cmluZ1tdLCBzZXAgPSAnfCcpXG57XG5cdGNvbnN0IFtmMSwgZjJdID0gZmllbGRzO1xuXHRjb25zdCBjID0gYCR7dDF9XyR7cHJvcH1gO1xuXHRyZXR1cm4gYChTRUxFQ1QgR1JPVVBfQ09OQ0FUKCR7Y30sICcke3NlcH0nKSBGUk9NIChTRUxFQ1QgRElTVElOQ1QgJHt0MX0uJHtwcm9wfSAke2N9IEZST00gJHtsaW5rfSBKT0lOICR7dDF9IE9OICR7bGlua30uJHtmMX0gPSAke3QxfS5pZCBXSEVSRSAke2xpbmt9LiR7ZjJ9ID0gJHt0Mn0uaWQpKWA7XG59XG5cbmZ1bmN0aW9uIGNvbmNhdF9zaW1wbGUodDogc3RyaW5nLCB0Mjogc3RyaW5nLCBmOiBzdHJpbmcsIHByb3A6IHN0cmluZywgZGlzdGluY3QgPSB0cnVlKVxue1xuXHQvLyBAdHMtaWdub3JlXG5cdGRpc3RpbmN0ID0gKGRpc3RpbmN0ID8gJyBESVNUSU5DVCcgOiAnJyk7XG5cdGNvbnN0IGMgPSBgJHt0fV8ke2Z9YDtcblx0cmV0dXJuIGAoU0VMRUNUIEdST1VQX0NPTkNBVCgke2N9LCAnfCcpIEZST00gKFNFTEVDVCR7ZGlzdGluY3R9ICR7dH0uJHtwcm9wfSAke2N9IEZST00gJHt0fSBXSEVSRSAke3R9LiR7Zn0gPSAke3QyfS5pZCkpYDtcbn1cblxuZnVuY3Rpb24gY29uY2F0KGYxOiBzdHJpbmcsIGYyOiBzdHJpbmcsIHByb3AsIGRpciA9IGZhbHNlLCBzZXAgPSAnfCcpXG57XG5cdGNvbnN0IHQxID0gZjEucmVwbGFjZSgvcyQvLCAnJykgKyAncyc7XG5cdGNvbnN0IHQyID0gZjIucmVwbGFjZSgvcyQvLCAnJykgKyAncyc7XG5cdGNvbnN0IGxpbmsgPSAoZGlyID8gYCR7dDF9XyR7dDJ9YCA6IGAke3QyfV8ke3QxfWApICsgJ19saW5rJztcblx0Y29uc3QgZmllbGRzID0gW2YxLCBmMl07XG5cdHJldHVybiBfY29uY2F0KHQxLCB0MiwgbGluaywgcHJvcCwgZmllbGRzLCBzZXApO1xufVxuXG5leHBvcnQgY2xhc3MgU3RhdGVtZW50XG57XG5cblx0cHJvdGVjdGVkIF9xdWVyeTogU2VsZWN0O1xuXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHRoaXMuX3F1ZXJ5ID0gc3F1ZWwuc2VsZWN0KHsgc2VwYXJhdG9yOiBcIlxcblwiIH0pO1xuXHR9XG5cblx0Ym9va0ZpZWxkcygpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0LmZpZWxkKCdib29rcy5pZCcsICdib29rX2lkJylcblx0XHRcdC5maWVsZCgnYm9va3MudGl0bGUnLCAnYm9va190aXRsZScpXG5cdFx0XHQuZmllbGQoJ2Jvb2tzLnNvcnQnLCAnYm9va19zb3J0Jylcblx0XHRcdC5maWVsZCgnYm9va3MuYXV0aG9yX3NvcnQnLCAnYXV0aG9yX3NvcnQnKVxuXHRcdFx0LmZpZWxkKCdib29rcy5oYXNfY292ZXInLCAnYm9va19oYXNfY292ZXInKVxuXHRcdFx0LmZpZWxkKCdib29rcy5wdWJkYXRlJywgJ2Jvb2tfZGF0ZScpXG5cdFx0XHQuZmllbGQoJ2Jvb2tzLnBhdGgnLCAnYm9va19wYXRoJylcblx0XHRcdC5maWVsZCgnYm9va3MuaXNibicsICdib29rX2lzYm4nKVxuXHRcdFx0LmZpZWxkKCdib29rcy5zZXJpZXNfaW5kZXgnLCAnYm9va19zZXJpZXNfaW5kZXgnKVxuXHRcdFx0LmZpZWxkKCdib29rcy51dWlkJywgJ2Jvb2tfdXVpZCcpXG5cdFx0XHQuZmllbGQoJ2Jvb2tzLnRpbWVzdGFtcCcsICdib29rX3RpbWVzdGFtcCcpXG5cdFx0XHQuZmllbGQoJ2Jvb2tzLmxhc3RfbW9kaWZpZWQnLCAnYm9va19sYXN0X21vZGlmaWVkJylcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGF1dGhvckJyb3dzZXJGaWVsZHMoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5maWVsZCgndGFnX2Jyb3dzZXJfYXV0aG9ycy5jb3VudCcsICdhdXRob3JzX2Jvb2tzX2NvdW50Jylcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGF1dGhvckZpZWxkcygpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0LmZpZWxkKCdhdXRob3JzLmlkJywgJ2F1dGhvcl9pZCcpXG5cdFx0XHQuZmllbGQoJ2F1dGhvcnMubmFtZScsICdhdXRob3JfbmFtZScpXG5cdFx0XHQuZmllbGQoJ2F1dGhvcnMuc29ydCcsICdhdXRob3Jfc29ydCcpXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0YWdGaWVsZHMoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5maWVsZCgndGFncy5uYW1lJywgJ3RhZ19uYW1lJylcblx0XHRcdC5maWVsZCgndGFncy5pZCcsICd0YWdfaWQnKVxuXHRcdFx0LmZpZWxkKCd0YWdzLmNvdW50JywgJ3RhZ19ib29rc19jb3VudCcpXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXJpZXNGaWVsZHMoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5maWVsZCgnc2VyaWVzLmlkJywgJ3Nlcmllc19pZCcpXG5cdFx0XHQuZmllbGQoJ3Nlcmllcy5uYW1lJywgJ3Nlcmllc19uYW1lJylcblx0XHRcdC5maWVsZCgnc2VyaWVzLnNvcnQnLCAnc2VyaWVzX3NvcnQnKVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c3VtRGF0YSgpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0LmZpZWxkKGNvbmNhdF9zaW1wbGUoJ2RhdGEnLCAnYm9va3MnLCAnYm9vaycsICdpZCcpLCAnZGF0YV9pZCcpXG5cdFx0XHQuZmllbGQoY29uY2F0X3NpbXBsZSgnZGF0YScsICdib29rcycsICdib29rJywgJ2Zvcm1hdCcpLCAnZGF0YV9mb3JtYXQnKVxuXHRcdFx0LmZpZWxkKGNvbmNhdF9zaW1wbGUoJ2RhdGEnLCAnYm9va3MnLCAnYm9vaycsICd1bmNvbXByZXNzZWRfc2l6ZScpLCAnZGF0YV9zaXplJylcblx0XHRcdC5maWVsZChjb25jYXRfc2ltcGxlKCdkYXRhJywgJ2Jvb2tzJywgJ2Jvb2snLCAnbmFtZScsIGZhbHNlKSwgJ2RhdGFfbmFtZScpXG5cdFx0Ly8uZmllbGQoXCJHUk9VUF9DT05DQVQoRElTVElOQ1QgZGF0YS5mb3JtYXQpXCIsJ2RhdGFfZm9ybWF0Jylcblx0XHQvLy5maWVsZChcIkdST1VQX0NPTkNBVChESVNUSU5DVCBkYXRhLnVuY29tcHJlc3NlZF9zaXplKVwiLCdkYXRhX3NpemUnKVxuXHRcdC8vLmpvaW4oJ2RhdGEnKVxuXHRcdC8vLndoZXJlKCdkYXRhLmJvb2sgPSBib29rcy5pZCcpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c3VtQm9va3M8VCBleHRlbmRzIEVudW1Cb29rc0ZpbHRlci5hdXRob3IgfCBFbnVtQm9va3NGaWx0ZXIudGFnIHwgRW51bUJvb2tzRmlsdGVyLnNlcmllcz4oX2Zyb20gPSBFbnVtQm9va3NGaWx0ZXIuYXV0aG9yIGFzIFQpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0LmZpZWxkKGNvbmNhdCgnYm9vaycsIF9mcm9tLCAnaWQnLCB0cnVlKSwgJ2Jvb2tfaWQnKVxuXHRcdFx0LmZpZWxkKGNvbmNhdCgnYm9vaycsIF9mcm9tLCAndGl0bGUnLCB0cnVlKSwgJ2Jvb2tfdGl0bGUnKVxuXHRcdFx0LmZpZWxkKGNvbmNhdCgnYm9vaycsIF9mcm9tLCAnc29ydCcsIHRydWUpLCAnYm9va19zb3J0Jylcblx0XHRcdC5maWVsZChjb25jYXQoJ2Jvb2snLCBfZnJvbSwgJ2hhc19jb3ZlcicsIHRydWUpLCAnYm9va19oYXNfY292ZXInKVxuXHRcdFx0LmZpZWxkKGNvbmNhdCgnYm9vaycsIF9mcm9tLCAncHViZGF0ZScsIHRydWUpLCAnYm9va19wdWJkYXRlJylcblx0XHRcdC5maWVsZChjb25jYXQoJ2Jvb2snLCBfZnJvbSwgJ3BhdGgnLCB0cnVlKSwgJ2Jvb2tfcGF0aCcpXG5cdFx0XHQuZmllbGQoY29uY2F0KCdib29rJywgX2Zyb20sICdzZXJpZXNfaW5kZXgnLCB0cnVlKSwgJ2Jvb2tfc2VyaWVzX2luZGV4Jylcblx0XHQvKlxuXHRcdC5maWVsZChcIkdST1VQX0NPTkNBVChESVNUSU5DVCBib29rcy5pZClcIiwnYm9va3NfaWQnKVxuXHRcdC5maWVsZChcIkdST1VQX0NPTkNBVChESVNUSU5DVCBib29rcy50aXRsZSlcIiwnYm9va3NfbmFtZScpXG5cdFx0LmZpZWxkKFwiR1JPVVBfQ09OQ0FUKERJU1RJTkNUIGJvb2tzLnNvcnQpXCIsJ2Jvb2tzX3NvcnQnKVxuXHRcdC5maWVsZChcIkdST1VQX0NPTkNBVChESVNUSU5DVCBib29rcy5oYXNfY292ZXIpXCIsJ2Jvb2tzX2hhc19jb3ZlcicpXG5cdFx0LmZpZWxkKFwiR1JPVVBfQ09OQ0FUKERJU1RJTkNUIGJvb2tzLnB1YmRhdGUpXCIsJ2Jvb2tzX3B1YmRhdGUnKVxuXHRcdC5maWVsZChcIkdST1VQX0NPTkNBVChESVNUSU5DVCBib29rcy5wYXRoKVwiLCdib29rc19wYXRoJylcblx0XHQuZmllbGQoXCJHUk9VUF9DT05DQVQoRElTVElOQ1QgYm9va3Muc2VyaWVzX2luZGV4KVwiLCdib29rc19zZXJpZXNfaW5kZXgnKVxuXHRcdCovXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzdW1TZXJpZXMoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5maWVsZChjb25jYXQoJ3NlcmllcycsICdib29rJywgJ2lkJyksICdzZXJpZXNfaWQnKVxuXHRcdFx0LmZpZWxkKGNvbmNhdCgnc2VyaWVzJywgJ2Jvb2snLCAnbmFtZScpLCAnc2VyaWVzX25hbWUnKVxuXHRcdFx0LmZpZWxkKGNvbmNhdCgnc2VyaWVzJywgJ2Jvb2snLCAnc29ydCcpLCAnc2VyaWVzX3NvcnQnKVxuXHRcdC8qXG5cdFx0LmZpZWxkKFwiR1JPVVBfQ09OQ0FUKERJU1RJTkNUIHNlcmllcy5pZClcIiwnc2VyaWVzX2lkJylcblx0XHQuZmllbGQoXCJHUk9VUF9DT05DQVQoRElTVElOQ1Qgc2VyaWVzLm5hbWUpXCIsJ3Nlcmllc19uYW1lJylcblx0XHQuZmllbGQoXCJHUk9VUF9DT05DQVQoRElTVElOQ1Qgc2VyaWVzLnNvcnQpXCIsJ3Nlcmllc19zb3J0Jylcblx0XHQqL1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c3VtVGFncygpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0Ly8uZmllbGQoJ3RhZ3MubmFtZScsJ3RhZ19uYW1lcycpXG5cdFx0XHQuZmllbGQoY29uY2F0KCd0YWcnLCAnYm9vaycsICdpZCcpLCAndGFnX2lkJylcblx0XHRcdC5maWVsZChjb25jYXQoJ3RhZycsICdib29rJywgJ25hbWUnKSwgJ3RhZ19uYW1lJylcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHN1bUF1dGhvcigpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0LmZpZWxkKGNvbmNhdCgnYXV0aG9yJywgJ2Jvb2snLCAnaWQnKSwgJ2F1dGhvcl9pZCcpXG5cdFx0XHQuZmllbGQoY29uY2F0KCdhdXRob3InLCAnYm9vaycsICduYW1lJyksICdhdXRob3JfbmFtZScpXG5cdFx0XHQuZmllbGQoY29uY2F0KCdhdXRob3InLCAnYm9vaycsICdzb3J0JyksICdhdXRob3Jfc29ydCcpXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjb21tZW50VGFncygpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0LmZpZWxkKCdjb21tZW50cy50ZXh0JywgJ2NvbW1lbnQnKVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YXBwZW5kQ29tbWVudHMoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5sZWZ0X2pvaW4oJ2NvbW1lbnRzJywgbnVsbCwgJ2NvbW1lbnRzLmJvb2sgPSBib29rcy5pZCcpXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhcHBlbmRTZXJpZXMoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5qb2luKCdib29rc19zZXJpZXNfbGluaycsIG51bGwsICdib29rc19zZXJpZXNfbGluay5ib29rID0gYm9va3MuaWQnKVxuXHRcdFx0LmpvaW4oJ3NlcmllcycsIG51bGwsICdzZXJpZXMuaWQgPSBib29rc19zZXJpZXNfbGluay5zZXJpZXMnKVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YXBwZW5kQm9va0Zyb21UYWcoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5qb2luKCdib29rc190YWdzX2xpbmsnLCBudWxsLCAnYm9va3NfdGFnc19saW5rLnRhZyA9IHRhZ3MuaWQnKVxuXHRcdFx0LmpvaW4oJ2Jvb2tzJywgbnVsbCwgJ2Jvb2tzLmlkID0gYm9va3NfdGFnc19saW5rLmJvb2snKVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YXBwZW5kQm9va0Zyb21TZXJpZXMoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5sZWZ0X2pvaW4oJ2Jvb2tzX3Nlcmllc19saW5rJywgbnVsbCwgJ2Jvb2tzX3Nlcmllc19saW5rLnNlcmllcyA9IHNlcmllcy5pZCcpXG5cdFx0XHQubGVmdF9qb2luKCdib29rcycsIG51bGwsICdib29rcy5pZCA9IGJvb2tzX3Nlcmllc19saW5rLmJvb2snKVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YXBwZW5kQm9va0Zyb21BdXRob3IoKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5qb2luKCdib29rc19hdXRob3JzX2xpbmsnLCBudWxsLCAnYm9va3NfYXV0aG9yc19saW5rLmF1dGhvciA9IGF1dGhvcnMuaWQnKVxuXHRcdFx0LmpvaW4oJ2Jvb2tzJywgbnVsbCwgJ2Jvb2tzLmlkID0gYm9va3NfYXV0aG9yc19saW5rLmJvb2snKVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YXBwZW5kVGFnRnJvbUJvb2soKVxuXHR7XG5cdFx0dGhpcy5fcXVlcnlcblx0XHRcdC5qb2luKCdib29rc190YWdzX2xpbmsnLCBudWxsLCAnYm9va3NfdGFnc19saW5rLmJvb2sgPSBib29rcy5pZCcpXG5cdFx0XHQuam9pbigndGFncycsIG51bGwsICd0YWdzLmlkID0gYm9va3NfdGFnc19saW5rLnRhZycpXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhcHBlbmRBdXRob3JGcm9tQm9vaygpXG5cdHtcblx0XHR0aGlzLl9xdWVyeVxuXHRcdFx0Ly8ubGVmdF9qb2luKCdjb21tZW50cycsbnVsbCwnY29tbWVudHMuYm9vayA9IGJvb2tzLmlkJylcblx0XHRcdC5maWVsZCgnYXV0aG9ycy5uYW1lJywgJ2F1dGhvcl9uYW1lJylcblx0XHRcdC5qb2luKCdib29rc19hdXRob3JzX2xpbmsnLCBudWxsLCAnYm9va3NfYXV0aG9yc19saW5rLmJvb2sgPSBib29rcy5pZCcpXG5cdFx0XHQuam9pbignYXV0aG9ycycsIG51bGwsICdhdXRob3JzLmlkID0gYm9va3NfYXV0aG9yc19saW5rLmF1dGhvcicpXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhcHBlbmRBdXRob3JCcm93c2VyKClcblx0e1xuXHRcdHRoaXMuX3F1ZXJ5XG5cdFx0XHQuam9pbigndGFnX2Jyb3dzZXJfYXV0aG9ycycsIG51bGwsICd0YWdfYnJvd3Nlcl9hdXRob3JzLmlkID0gYXV0aG9ycy5pZCcpXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0b1N0cmluZygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcXVlcnkudG9TdHJpbmcoKTtcblx0fVxuXG5cdHF1ZXJ5KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9xdWVyeTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVN0YXRlbWVudCgpXG57XG5cdHJldHVybiBuZXcgU3RhdGVtZW50KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VTdGF0ZW1lbnQ7XG4iXX0=