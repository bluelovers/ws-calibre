import isOPDSAgent from 'is-opds-agent';
import assert from 'assert';

let ua = `OPDS/Stanza iPhone/Aldiko/Moon+ Reader(Android)`;

let result = isOPDSAgent(ua);

console.log(ua , `=>`, !!result, result);

assert(result);

