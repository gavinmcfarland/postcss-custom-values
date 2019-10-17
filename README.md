# PostCSS Custom Values [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

_This is a work in progress and not recommended for production_

With [PostCSS Custom Values] you can create your own CSS values such as keywords and units.

```pcss
/* Create a keyword which can be used with any property */
@value long {
  value: 500px;
};

/* Create a keyword restricted to certain properties */
@value small property(padding, margin) {
  value: 20px;
};
@value small property(font-size) {
  value: 12px;
};

/* Create a custom unit using <tokens> */
@value <number>gu {
  value: calc($0 * 4px);
};

.example {
  position: absolute;
  top: long;
  width: long;
  font-size: small;
  padding: small;
  margin: 5gu 10px 10gu 1em;
}
```

Output:
```css
.example {
  position: absolute;
  top: 500px;
  width: 500px;
  font-size: 12px;
  padding: 20px;
  margin: calc(5 * 4px) 10px calc(10 * 4px) 1em;
}
```

## Tokens

Tokens can be placed anywhere within the value identifier.

```pcss
@value layout_<side> {...}
@value <number>gu {...}
@value _<integer>_ {...}
```

Data is captured by the token and can be used to calculate the value by referencing it using `$0`.

```pcss
@value space_<integer> {
  value: calc($0 * 10px);
}
```

Below are a list of the currently available tokens.

| Key         | Description                                              |
|-------------|----------------------------------------------------------|
| `<number>`  | Any number including decimal points and negative numbers |
| `<integer>` | Only whole numbers including negative integers           |
| `<side>`    | top, right, bottom or left                               |


## Setup

```bash
npm install postcss-custom-values --save-dev
```

[cli-img]: https://img.shields.io/travis/limitlessloop/postcss-custom-values.svg
[cli-url]: https://travis-ci.org/limitlessloop/postcss-custom-values
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-custom-values.svg
[npm-url]: https://www.npmjs.com/package/postcss-custom-values

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Custom Values]: https://github.com/mindthetic/postcss-custom-values
