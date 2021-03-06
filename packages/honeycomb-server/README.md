# honeycomb-server

> Simple web server for Honeycomb using [hapi.js](https://hapijs.com) atop [Node.js](https://nodejs.org/).

## Installation

```bash
npm install --save honeycomb-server
```

## Usage

```javascript
import honeycombServer from 'honeycomb-server';

honeycombServer.start();
```

### Returning a Promise object

`start()` returns a Promise object resolving to the hapi.js server.

```javascript
import honeycombServer from 'honeycomb-server';
import honeycombRegistryClient from 'honeycomb-registry-client';
import options from '../../.config/server';

honeycombServer.start(options)
  .then((server) => {
    honeycombRegistryClient.register(pkg.name, server.info.host, server.info.port);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
```

## Configuration

### `server: {}`

An object containing the options passed to new [Hapi.Server([options])](https://hapijs.com/api#new-serveroptions).

#### Default

```javascript
{}
```

#### Example

```javascript
{
  load: {
    sampleInterval: 1000,
  },
}
```

### `connections: [{}]`

An array of connection options objects that are mapped to calls of [server.connection([options])](https://hapijs.com/api#serverconnectionoptions).

#### Default

```javascript
[{
  host: process.env.HOST,
  address: process.env.HOST_IP || '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 3000,
}]
```

#### Example

```javascript
[{
  address: '127.0.0.1',
  port: 3001,
}]
```

### `plugins: [{}]`

An array of plugin objects with `module` (string) and `options` (object).

#### Default

```javascript
[]
```

#### Example

```javascript
[
  {
    module: 'honeycomb-logging-middleware',
  },
  {
    module: 'hapi-router',
    options: {
      routes: 'src/server/routes/*.js',
    },
  },
]
```

### Extended Example

```javascript
import honeycombServer from 'honeycomb-server';

const options = {
  server: {
    load: {
      sampleInterval: 1000,
    },
  },
  connections: [{
    address: '127.0.0.1',
    port: 3001,
  }],
  plugins: [
    {
      module: 'honeycomb-logging-middleware',
    },
    {
      module: 'hapi-router',
      options: {
        routes: 'src/server/routes/*.js',
      },
    },
  ],
};

honeycombServer.start(options);
```

## License

Copyright (c) 2017 Daniel Bayerlein. See [LICENSE](../../LICENSE.md) for details.
