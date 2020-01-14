/**
 * Created by user on 2020/1/14.
 */

import FastGlob from '@bluelovers/fast-glob/bluebird';
import { join, dirname, posix } from "upath2";
import Bluebird from 'bluebird';

export function findLibrarys(options: {
	cwd: string
})
{
	const { cwd } = options;

	return FastGlob([
		'*/metadata.db',
	], {
		cwd,
	})
		.map(_path => {
			let _fullpath = join(cwd, _path);
			let name = dirname(_path);

			return {
				name,
				_path,
				_fullpath,
			}
		})
}

export default findLibrarys
