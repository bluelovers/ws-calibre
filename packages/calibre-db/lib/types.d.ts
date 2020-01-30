/**
 * Created by user on 2020/1/14.
 */
export declare const enum EnumBooksFilter {
    tag = "tag",
    author = "author",
    series = "series"
}
export declare const enum EnumDataFormat {
    EPUB = "EPUB"
}
export declare const enum EnumDataFormatLowerCase {
    EPUB = "epub"
}
export interface IBookBase {
    book_id: string;
    book_title: string;
    book_sort: string;
    book_has_cover: '1' | undefined;
    book_date: string;
    /**
     * dirname
     */
    book_path: string;
    book_series_index: string;
}
export interface IBook extends Omit<IBookBase, 'book_has_cover' | 'book_id' | 'book_series_index'> {
    book_id: number;
    book_has_cover: 1 | 0;
    book_isbn: string;
    book_series_index: number;
    comment: string;
    tags: ITagBase[];
    authors: IAuthorBase[];
    series: ISeriesBase[];
    data: IBookFile[];
    book_uuid: string;
    book_timestamp: string;
    book_last_modified: string;
}
export interface IBookFile {
    data_id: string;
    data_format: string | EnumDataFormat;
    data_size: string;
    /**
     * file name
     */
    data_name: string;
}
export interface ITagBase {
    tag_name: string;
    tag_id: number;
}
export interface ITag extends ITagBase {
    tag_books_count: number;
    books: IBookBase[];
}
export interface ISeriesBase {
    series_id: number;
    series_name: string;
    series_sort: string;
}
export interface ISeries extends ISeriesBase {
    books: IBookBase[];
}
export interface IAuthorBase {
    author_id: number;
    author_name: string;
    author_sort: string;
}
export interface IAuthor extends IAuthorBase {
    authors_books_count: number;
    books: IBookBase[];
    series: ISeriesBase[];
}
export interface IFindLibrarys {
    name: string;
    _path: string;
    _fullpath: string;
    _fulldir: string;
}
