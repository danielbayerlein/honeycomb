# honeycomb-registry-client

> Service registry client for Honeycomb

## Installation

```bash
npm install --save honeycomb-registry-client
```

## Usage

```javascript
const HoneycombRegistryClient = require('honeycomb-registry-client');

HoneycombRegistryClient.register(
  'test',      // Name
  '127.0.0.1', // Host
  3000         // Port
);
```

## License

Copyright (c) 2016 Daniel Bayerlein. See [LICENSE](../../LICENSE.md) for details.
