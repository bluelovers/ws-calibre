/**
 * Created by user on 2020/1/14.
 */

type IRow = {
	pubdate?: Date,
	books?: IRow[],
}

function pubdate<T extends IRow>(row: T)
{
	if (row.pubdate)
	{
		row.pubdate = new Date(row.pubdate);
	}
	if (row.books && row.books.length)
	{
		row.books.forEach(pubdate);
	}
	return row;
}

export function propertiesCollapser<T>(arr: T[], collapsedName: string, regex: RegExp, sep = '|')
{
	const keys = Object.keys(arr[0]).filter(propName => regex.test(propName));
	const firstKey = keys[0];
	return function collapse(row: T, index: number): T
	{
		keys.forEach(function (propName)
		{
			row[propName] = (row[propName] && row[propName].split(sep)) || [];
		});
		row[collapsedName] = row[firstKey].map(function (id, index)
		{
			const element = {};
			keys.forEach(function (propName)
			{
				//const _propName = propName.replace(regex,'')
				element[propName] = row[propName][index];
			});
			return element;
		});
		keys.forEach(function (propName) {delete row[propName];})
		return pubdate(row);
	}
}

export default propertiesCollapser
