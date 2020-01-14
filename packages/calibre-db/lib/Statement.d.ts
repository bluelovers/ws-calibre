import squel, { Select } from "squel";
import { EnumBooksFilter } from './types';
export declare class Statement {
    protected _query: Select;
    constructor();
    bookFields(): this;
    authorBrowserFields(): this;
    authorFields(): this;
    tagFields(): this;
    seriesFields(): this;
    sumData(): this;
    sumBooks<T extends EnumBooksFilter.author | EnumBooksFilter.tag | EnumBooksFilter.series>(_from?: T): this;
    sumSeries(): this;
    sumTags(): this;
    sumAuthor(): this;
    commentTags(): this;
    appendComments(): this;
    appendSeries(): this;
    appendBookFromTag(): this;
    appendBookFromSeries(): this;
    appendBookFromAuthor(): this;
    appendTagFromBook(): this;
    appendAuthorFromBook(): this;
    appendAuthorBrowser(): this;
    toString(): string;
    query(): squel.Select;
}
export declare function makeStatement(): Statement;
export default makeStatement;
