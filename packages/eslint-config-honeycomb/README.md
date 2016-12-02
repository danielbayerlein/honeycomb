# eslint-config-honeycomb

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for [Honeycomb](https://github.com/danielbayerlein/honeycomb)

## Installation and Usage

### honeycomb-base

```bash
npm install --save-dev eslint-config-honeycomb eslint eslint-plugin-import
```

Add the extends attribute to your `.eslintrc.yml`:

```yaml
  extends:
    "honeycomb/base"
```

### honeycomb-react

```bash
npm install --save-dev eslint-config-honeycomb eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

Add the extends attribute to your `.eslintrc.yml`:

```yaml
extends:
  "honeycomb/react"
```

## License

Copyright (c) 2016 Daniel Bayerlein. See [LICENSE](../../LICENSE.md) for details.
