import createDB, { DB } from './DB';
import Bluebird from 'bluebird';

export function loadLibrary(row: {
	name: string;
	_fullpath: string;
})
{
	return createDB(row.name, row._fullpath);
}

export default loadLibrary
