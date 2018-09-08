# PostCSS Custom Values [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

_This is a work in progress and not recommended for production_

With [PostCSS Custom Values] you can create your own CSS values such as keywords and units.

```css
@value long {
	value: 500px;
};

@value small property(padding, margin) {
	value: 20px;
};

@value medium property(padding, margin) {
	value: 40px;
};

@value small property(font-size) {
	value: 12px;
};

@value <number>gu {
	value: calc($0 * 4px);
};

.example {
  position: absolute;
  top: long;
  width: long;
	font-size: small;
	padding: small medium;
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
	padding: 20px 40px;
  margin: calc(5 * 4px) 10px calc(10 * 4px) 1em;
}
```

## Setup

```bash
npm install postcss-custom-values --save-dev
```

[cli-img]: https://img.shields.io/travis/mindthetic/postcss-custom-values.svg
[cli-url]: https://travis-ci.org/mindthetic/postcss-custom-values
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-custom-values.svg
[npm-url]: https://www.npmjs.com/package/postcss-custom-values

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Custom Values]: https://github.com/mindthetic/postcss-custom-values
