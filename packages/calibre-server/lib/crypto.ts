/**
 * Created by user on 2020/1/14.
 */

import crypto from 'crypto';

export function hash_sha1(input: any)
{
	const shasum = crypto.createHash('sha1');
	shasum.update(input);
	return shasum.digest('hex').slice(0, 6)
}
