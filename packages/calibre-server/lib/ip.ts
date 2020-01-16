import { ip as IPAddress } from 'address';
import os from "os";

export function searchIPAddress()
{
	let interfaces = os.networkInterfaces();

	let keys = Object.keys(interfaces)
		.sort((a, b) =>
		{
			let aa = /vEthernet/.test(a);
			let bb = /vEthernet/.test(b);

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

		if (ip)
		{
			break;
		}
	}

	if (!ip)
	{
		ip = '127.0.0.1';
	}

	return ip;
}

export default searchIPAddress
