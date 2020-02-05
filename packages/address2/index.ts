import { ip as IPAddress, ipv6 } from 'address';
import os, { NetworkInterfaceInfo } from "os";

export function searchIPAddress(options: {
	filterInterfacesNot?: string | RegExp | ((interfaceName: string, interfaceData: NetworkInterfaceInfo[]) => boolean);
	filterIP?: string | RegExp | ((ip: string) => boolean);
	defaultIP?: string,
	family?: NetworkInterfaceInfo["family"]
} = {})
{
	let interfaces = os.networkInterfaces();

	let { filterInterfacesNot = defaultFilter, defaultIP = '127.0.0.1', filterIP, family = 'IPv4' as NetworkInterfaceInfo["family"] } = options;

	filterInterfacesNot = _handleInputCallback(filterInterfacesNot, defaultFilter);
	filterIP = _handleInputCallback(filterIP, (ip) => ip && ip !== '127.0.0.1' && ip !== '0.0.0.0');

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
					return 1
				}
				else if (aa)
				{
					return -1
				}
			}

			return 0
		})
	;

	let ip: string;

	let fns = family === 'IPv6' ? [
		ipv6,
		IPAddress,
	]: [
		IPAddress,
		ipv6,
	];

	for (let interfaceName of keys)
	{
		for (let fn of fns)
		{
			try
			{
				ip = fn(interfaceName);
				break;
			}
			catch (e)
			{

			}
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
	return !/vEthernet/i.test(interfaceName) && interfaceData.some(data => !data.internal)
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
