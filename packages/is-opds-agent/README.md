# README.md

    check user-agent is opds reader

## install

```bash
yarn add is-opds-agent
yarn-tool add is-opds-agent
yt add is-opds-agent
```

```typescript
import isOPDSAgent from 'is-opds-agent';
import assert from 'assert';

let ua = `OPDS/Stanza iPhone/Aldiko/Moon+ Reader(Android)`;

let result = isOPDSAgent(ua);

console.log(ua , `=>`, !!result, result);

assert(result);
```
