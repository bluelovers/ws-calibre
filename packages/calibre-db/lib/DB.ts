import { Database, OPEN_READONLY } from 'sqlite3';
import { Statement } from './Statement';
import makeWhere, { ILocator } from './utils/makeWhere';
import compose from './utils/compose';
import propertiesCollapser from './utils/propertiesCollapser';
import { EnumBooksFilter, IBook, IAuthor, ISeries, ITag } from './types';
import { Select } from 'squel';
import Bluebird from 'bluebird';

export class DB
{
	protected _debug: boolean = false;
	protected _logger: Console;

	constructor(protected readonly _name: string, protected readonly _path: string, protected readonly _db: Database)
	{

	}

	debug(doDebug: boolean)
	{
		this._debug = !!doDebug;
	}

	logger(logger: Console)
	{
		this._logger = logger;
	}

	getLogger()
	{
		return this._logger || console
	}

	log<T>(thing: T)
	{
		if (!this._debug)
		{
			return;
		}
		this.getLogger().log(this._name, thing);
	}

	error<T>(thing: T)
	{
		if (!this._debug)
		{
			return;
		}
		this.getLogger().error(this._name, thing);
	}

	db()
	{
		return this._db;
	}

	name()
	{
		return this._name;
	}

	path()
	{
		return this._path;
	}

	execute<T>(statement: Select)
	{
		return new Bluebird<T[]>((resolve, reject) =>
		{
			const { text, values } = statement.toParam();
			this.log(statement.toString());

			this._db.all(text, values, (err, rows: T[]) =>
			{
				if (err)
				{
					return reject(err);
				}
				if (!rows.length)
				{
					const err = new Error(`no rows`);
					this.error(err);
					return reject(err);
				}
				this.log(rows);
				return resolve(rows);
			});
		})
	}

	getBook(book: ILocator | number, columnName?: 'book_id' | 'book_uuid')
	{
		columnName ??= 'book_id';

		if (!['book_id', 'book_uuid'].includes(columnName))
		{
			return Bluebird.reject(new RangeError(`Invalid columnName for book: '${columnName}'`))
		}

		return this.getBooks(book, columnName)
			.then(r => r[0])
	}

	getBooks(book?: ILocator | number, columnName?: keyof IBook)
	{
		const [where, value] = makeWhere('book', book as any, columnName ?? 'title', '_');
		const statement = new Statement()
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
			.order('book_id', false)
		;

		return this.execute<IBook>(statement).then(function (books)
		{
			const collapse = compose<IBook>(
				propertiesCollapser(books, 'tags', /^tag_/)
				, propertiesCollapser(books, 'authors', /^author_/)
				, propertiesCollapser(books, 'series', /^series_/)
				, propertiesCollapser(books, 'data', /^data_/),
			);
			return books.map(collapse);
		})
	}

	getTags(tag?: ILocator)
	{
		const [where, value] = makeWhere('tags', tag);
		const statement = new Statement()
			.sumBooks(EnumBooksFilter.tag)
			.tagFields()
			.appendBookFromTag()
			.query()
			.from('tag_browser_tags', 'tags')
			.group('tags.name')
			.where(where, value)
		;
		return this.execute<ITag>(statement).then(function (series)
		{
			const collapse = propertiesCollapser(series, 'books', /^book_/);
			return series.map(collapse);
		})
	}

	getSeries(series?: ILocator)
	{
		const [where, value] = makeWhere('series', series);
		const statement = new Statement()
			.sumBooks(EnumBooksFilter.series)
			.seriesFields()
			.appendBookFromSeries()
			.query()
			.from('series')
			.group('series.name')
			.where(where, value)
		;
		return this.execute<ISeries>(statement).then(function (series)
		{
			const collapse = propertiesCollapser(series, 'books', /^book_/);
			return series.map(collapse);
		})
	}

	getAuthors(author?: ILocator)
	{
		const [where, value] = makeWhere('authors', author);
		const statement = new Statement()
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
			.where(where, value)
		;
		return this.execute<IAuthor>(statement).then(function (authors)
		{
			const collapse = compose(
				propertiesCollapser(authors, 'books', /^book_/)
				, propertiesCollapser(authors, 'series', /^series_/),
			);
			return authors.map(collapse);
		})
	}

	endpoint<T>(endPoints: T)
	{
		return {
			name: this._name,
			type: 'database' as const,
			endPoints,
		};
	}

}

export function createDB(name: string, path: string)
{
	return new Bluebird<DB>(function (resolve, reject)
	{
		const db = new Database(path, OPEN_READONLY, function (err)
		{
			if (err)
			{
				return reject(err);
			}

			const Query = new DB(name, path, db);
			return resolve(Query);
		});
	})
}

export default createDB
