import { resolve } from "path";
import { sync as FastGlob } from '@bluelovers/fast-glob/bluebird';
import { array_unique } from 'array-hyper-unique';
import { IFaviconData } from '../types';

export function parseFavicon(favicon: IFaviconData)
{
	if (typeof favicon === 'string' || Buffer.isBuffer(favicon))
	{
		return favicon
	}
	else if (typeof favicon === 'object')
	{
		return Buffer.from(favicon.value, favicon.type)
	}
	else if (favicon)
	{
		throw new TypeError(`unknown favicon data type, ${favicon}`)
	}

	return null;
}

export function defaultFavicon(staticPath: string, localStatic: string): string
{
	let ls = array_unique([
		staticPath,
		localStatic,
	]);

	for (let targetPath of ls)
	{
		let ret = FastGlob([
			`favicon.{png,ico,bmp}`,
		], {
			cwd: staticPath,
			absolute: true,
		});

		if (ret.length)
		{
			return ret[0];
		}
	}

	return resolve(localStatic, `favicon.png`)
}
