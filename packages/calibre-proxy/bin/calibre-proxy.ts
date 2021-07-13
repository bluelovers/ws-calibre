#!/usr/bin/env node

import yargs from 'yargs';
import createServer from '..';

const argv = yargs
	.option('port', {
		alias: ['p'],
		number: true,
	})
	.option('targetPort', {
		alias: ['t'],
		number: true,
	})
	.option('target', {
		alias: ['h'],
		string: true,
	})
	.help()
	.showHelpOnFail(true)
	.parseSync()
;

createServer(argv);
