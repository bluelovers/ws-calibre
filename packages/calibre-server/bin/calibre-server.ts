#!/usr/bin/env node

import yargs from 'yargs';
import { resolve } from 'path';
import createServer from '../lib/server';

const argv = yargs
	.option('port', {
		alias: ['p'],
		number: true,
	})
	.option('staticPath', {
		normalize: true,
	})
	.option('siteTitle', {
		alias: ['title'],
		string: true,
	})
	.option('calibrePaths', {
		array: true,
		string: true,
	})
	.option('cwd', {
		alias: ['c'],
		normalize: true,
	})
	.help()
	.showHelpOnFail(true)
	.argv
;

let { cwd = argv._[0] as string } = argv;

if (!cwd)
{
	cwd = process.cwd();
}

cwd = resolve(cwd);

createServer({
	...argv,
	cwd,
});
