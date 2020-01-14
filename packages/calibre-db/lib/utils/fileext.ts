/**
 * Created by user on 2020/1/14.
 */
import { EnumDataFormat, EnumDataFormatLowerCase } from '../types';

export function fileext(ext: EnumDataFormat.EPUB): EnumDataFormatLowerCase.EPUB
export function fileext(ext: string | EnumDataFormat): string | EnumDataFormatLowerCase
export function fileext(ext: string | EnumDataFormat): string | EnumDataFormatLowerCase
{
	return ext.toLowerCase();
}

export default fileext
