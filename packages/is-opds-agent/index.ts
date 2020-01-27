/**
 * Created by user on 2020/1/27.
 */

export const enum EnumOPDSAgent
{
	None = 0x0,
	OPDS = 0x1,
	MoonPlusReader = 0x2,
	Stanza = 0x4,
	Aldiko = 0x8,
}

/**
 * this ua from Moon+ Reader
 */
export const LAZY_OPDS_UA = `OPDS/Stanza iPhone/Aldiko/Moon+ Reader(Android)`;

export function isOPDSAgent(ua: string)
{
	let result = EnumOPDSAgent.None;

	if (/Moon\+ Reader/i.test(ua))
	{
		result |= EnumOPDSAgent.MoonPlusReader
	}

	if (/OPDS/i.test(ua))
	{
		result |= EnumOPDSAgent.OPDS
	}

	if (/Stanza/i.test(ua))
	{
		result |= EnumOPDSAgent.Stanza
	}

	if (/Aldiko/i.test(ua))
	{
		result |= EnumOPDSAgent.Aldiko
	}

	return result
}

export function hasFlag(result: number | EnumOPDSAgent, flag: EnumOPDSAgent)
{
	return Boolean(result & flag)
}

export default isOPDSAgent
