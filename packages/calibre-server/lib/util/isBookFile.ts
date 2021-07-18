import { fileext } from 'calibre-db/lib/utils/fileext';
import { EnumDataFormatLowerCase } from 'calibre-db/lib/types';

export function isBookFile(ext: string)
{
	ext = fileext(ext);

	if (ext === EnumDataFormatLowerCase.EPUB || /cb7|cba|cbr|cbt|cbz/.test(ext))
	{
		return true;
	}

	return false;
}
