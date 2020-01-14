/**
 * Created by user on 2020/1/14.
 */
import { IBook, IBookFile } from '../types';
import fileext from './fileext';

export function strip001(v: string)
{
	return v.replace(/'/g,'\\\'')
}

export function getFilePath(file: IBookFile , book: IBook)
{
	return [encodeURI(book.book_path), encodeURIComponent(strip001(file.data_name))].join('/') + fileext(file.data_format)
}
