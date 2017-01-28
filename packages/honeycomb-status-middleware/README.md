# honeycomb-status-middleware

> Status endpoint for Honeycomb using [hapijs-status-monitor](https://github.com/ziyasal/hapijs-status-monitor)

## Installation

```bash
npm install --save honeycomb-status-middleware
```

## Endpoint

`/admin/status`

## Usage

```javascript
server.register([{
  register: require('honeycomb-status-middleware'),
}], (err) => {
  if (err) {
    throw err;
  }
});
```

## Configuration

### `options: {}`

An object with `title` (string).

#### Default

```javascript
{
  title: 'Status',
}
```

#### Example

```javascript
{
  title: 'My Status Monitor',
}
```

## License

Copyright (c) 2017 Daniel Bayerlein. See [LICENSE](../../LICENSE.md) for details.
