import { createDB, DB } from './DB';
import Bluebird from 'bluebird';
import { IFindLibrarys } from './types';

export function loadLibrary(dbEntry: Pick<IFindLibrarys, 'name' | '_fullpath'>)
{
	return createDB(dbEntry.name, dbEntry._fullpath);
}

export default loadLibrary
