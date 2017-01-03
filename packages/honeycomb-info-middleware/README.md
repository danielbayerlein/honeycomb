# honeycomb-info-middleware

> Info endpoint for Honeycomb

## Installation

```bash
npm install --save honeycomb-info-middleware
```

## Usage

```javascript
server.register([{
  register: require('honeycomb-info-middleware'),
  options: {
    pkg: require('./package.json'),
    process,
  },
}], (err) => {
  if (err) {
    throw err;
  }
});
```

## License

Copyright (c) 2016-2017 Daniel Bayerlein. See [LICENSE](../../LICENSE.md) for details.
