import proxy from 'express-http-proxy';
import express from 'express';
import { Console2 } from 'debug-color2';
import { inspect } from 'util';
import { Server } from 'http';
import { AddressInfo } from "net";
import searchIPAddress from 'address2';
import qrcode from 'qrcode-terminal';

export const console = new Console2(null, {
	chalkOptions: {
		enabled: true,
	},
	inspectOptions: {
		colors: true,
		depth: 5,
	},
	label: true,
	time: true,
});

console.setOptions({
	label: true,
	enabled: true,
});

export function createServer(options: {
	port?: number,
	targetPort?: number,
	target?: string,
} = {})
{
	let { port = 80, targetPort = 8080, target } = options;

	const app = express();

	if (!target)
	{
		target = `http://127.0.0.1:${targetPort}`;
	}

	app.use('/', proxy(target, {
		userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes)
		{
			let contentType = headers['content-type'];
			headers['content-type'] = contentType.replace(/atom\+xml/, 'xml');
			return headers
		},

		memoizeHost: true,
	}));

	let _app = app.listen(port, function (this: Server, ...argv)
	{
		let address = this.address() as AddressInfo;

		let ip: string = searchIPAddress();

		let href = `http://${ip}:${address.port}/opds`;

		qrcode.generate(href, { small: true });

		console.success(`伺服器成功啟動`);
		console.success(`將以 ${href} 代理 ${target}`);

		if (ip !== '127.0.0.1')
		{
			let ip = '127.0.0.1';
			href = `http://${ip}:${address.port}/opds`;
			console.success(`將以 ${href} 代理 ${target}`);
		}
	});

	return _app;
}

export default createServer
