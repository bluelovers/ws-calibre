#!/usr/bin/env node

import yargs from 'yargs';
import { resolve } from 'path';
import createServer from '../lib/server';
import { defaultServerOptions } from '../lib/server/options';

const argv = yargs
	.option('port', {
		alias: ['p'],
		number: true,
		default: defaultServerOptions().port,
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
	.parseSync()
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
