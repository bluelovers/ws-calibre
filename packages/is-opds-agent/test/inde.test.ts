/**
 * Created by user on 2020/1/27.
 */

///<reference types="jest"/>

import isOPDSAgent, { EnumOPDSAgent, hasFlag } from '../index';

declare module jest
{
	interface Matchers<R, T = {}>
	{
		toHasFlag(expected: number): R
	}
}

expect.extend({
	toHasFlag(received: number, expected: number)
	{
		return {
			message: () =>
				`expected ${received} to has flag ${expected}`,
			pass: Boolean(received & expected),
		};
	},
});

const ua = `OPDS/Stanza iPhone/Aldiko/Moon+ Reader(Android)`;

Object.entries({
	"靜讀天下": {
		ua,
		flags: EnumOPDSAgent.MoonPlusReader,
	},
	"OPDS": {
		ua,
		flags: EnumOPDSAgent.OPDS,
	},
	"Stanza": {
		ua,
		flags: EnumOPDSAgent.Stanza,
	},
	"Aldiko": {
		ua,
		flags: EnumOPDSAgent.Aldiko,
	},
}).forEach(([name, data]) =>
{

	test(`${name}`, async () =>
	{
		let actual = isOPDSAgent(data.ua);
		// @ts-ignore
		expect(actual).toHasFlag(data.flags);
		expect(hasFlag(actual, data.flags)).toBeTruthy();
		expect(actual).toMatchSnapshot();
	})

});

test(`other`, async () =>
{
	let actual = isOPDSAgent(`other`);
	expect(actual).toStrictEqual(0);
});
