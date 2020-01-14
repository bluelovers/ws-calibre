/**
 * Created by user on 2020/1/14.
 */
import { EnumDataFormat, EnumDataFormatLowerCase } from '../types';
export declare function fileext(ext: EnumDataFormat.EPUB): EnumDataFormatLowerCase.EPUB;
export declare function fileext(ext: string | EnumDataFormat): string | EnumDataFormatLowerCase;
export default fileext;
