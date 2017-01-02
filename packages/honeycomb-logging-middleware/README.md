# honeycomb-logging-middleware

> Logging middleware for Honeycomb

## Installation

```bash
npm install --save honeycomb-logging-middleware
```

## Usage

```javascript
server.register([{
  register: require('honeycomb-logging-middleware'),
}], (err) => {
  if (err) {
    throw err;
  }
});
```

## License

Copyright (c) 2016 Daniel Bayerlein. See [LICENSE](../../LICENSE.md) for details.
