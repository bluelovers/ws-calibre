import { ip as IPAddress } from 'address';
import os, { NetworkInterfaceInfo } from "os";

export function searchIPAddress(options: {
	filterInterfacesNot: string | RegExp | ((interfaceName: string, interfaceData: NetworkInterfaceInfo[]) => boolean);
	filterIP: string | RegExp | ((ip: string) => boolean);
	defaultIP: string,
} = {} as any)
{
	let interfaces = os.networkInterfaces();

	let { filterInterfacesNot = defaultFilter, defaultIP = '127.0.0.1', filterIP } = options;

	filterInterfacesNot = _handleInputCallback(filterInterfacesNot, defaultFilter);
	filterIP = _handleInputCallback(filterIP, null);

	let fn = filterInterfacesNot;

	let keys = Object.keys(interfaces)
		.sort((a, b) =>
		{
			let aa = fn(a, interfaces[a]);
			let bb = fn(b, interfaces[b]);

			if (aa != bb)
			{
				if (bb)
				{
					return -1
				}
				else if (aa)
				{
					return 1
				}
			}

			return 0
		})
	;

	let ip: string;

	for (let interfaceName of keys)
	{
		try
		{
			ip = IPAddress(interfaceName);
		}
		catch (e)
		{

		}

		if (ip && (!filterIP || filterIP(ip)))
		{
			break;
		}
	}

	if (!ip)
	{
		ip = defaultIP || '127.0.0.1';
	}

	return ip;
}

export function defaultFilter(interfaceName: string, interfaceData: NetworkInterfaceInfo[])
{
	return /vEthernet/.test(interfaceName)
}

export function _handleInputCallback<T extends (s: string, ...argv: any) => boolean>(callback: string | RegExp | T, defaultCallback: T): T
{
	let type = typeof callback;

	if (callback == null && (typeof defaultCallback !== 'undefined'))
	{
		callback = defaultCallback;
	}
	else if (type === 'string')
	{
		// @ts-ignore
		callback = (s) => s.includes(callback as string);
	}
	else if (callback instanceof RegExp)
	{
		// @ts-ignoreq
		callback = (s) => (callback as RegExp).test(s)
	}
	else if (type !== 'function')
	{
		throw new TypeError(`callback must is string / RegExp / function, but got ${type} ${callback}`)
	}

	return callback as T;
}

export default searchIPAddress
