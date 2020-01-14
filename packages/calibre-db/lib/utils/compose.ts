/**
 * Created by user on 2020/1/14.
 */

export function compose<T>(...fns: ((row: T, index: number) => T)[])
{
	const length = fns.length;
	return function processRow(row: T, index: number): T
	{
		let i = 0;
		while (i < length)
		{
			const fn = fns[i++];
			row = fn(row as any, index);
		}
		return row as any;
	}
}

export default compose;
