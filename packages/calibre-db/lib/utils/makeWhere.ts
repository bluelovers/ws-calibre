
export type ILocator = string | '*' | '' | '/';

export function makeWhere<T extends Record<string, any>>(tableName: string, locator: ILocator, columnName: keyof T = 'name', sep = '.')
{
	const getAll = (locator == null || locator === '*' || locator === '' || locator === '/');
	const isNumber = /\d+/.test(locator + '');
	const isString = !isNumber;
	const whereStatement = getAll ?
		`${tableName}${sep}id LIKE ?` :
		isString ?
			`${tableName}${sep}${columnName} COLLATE UTF8_GENERAL_CI LIKE ?` :
			`${tableName}${sep}id = ?`
	;
	const value = getAll ? '%' : isString ? `%${locator}%` : locator;
	return [whereStatement, value] as const;
}

export default makeWhere
