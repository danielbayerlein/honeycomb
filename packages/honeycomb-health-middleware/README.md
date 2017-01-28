# honeycomb-health-middleware

> Health endpoint for Honeycomb

## Installation

```bash
npm install --save honeycomb-health-middleware
```

## Endpoint

`/admin/health`

## Usage

```javascript
server.register([{
  register: require('honeycomb-health-middleware'),
}], (err) => {
  if (err) {
    throw err;
  }
});
```

## License

Copyright (c) 2016-2017 Daniel Bayerlein. See [LICENSE](../../LICENSE.md) for details.
