# nanoclamp

![Last version](https://img.shields.io/github/tag/microlinkhq/nanoclamp.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/microlinkhq/nanoclamp/master.svg?style=flat-square)](https://travis-ci.org/microlinkhq/nanoclamp)
[![Dependency Status](https://david-dm.org/microlinkhq/nanoclamp.svg?path=packages/metascraper&style=flat-square)](https://david-dm.org/microlinkhq/nanoclamp?path=packages/metascraper)
[![NPM Status](https://img.shields.io/npm/dm/nanoclamp.svg?style=flat-square)](https://www.npmjs.org/package/metascraper)

###### [Storybook](https://nanoclamp.netlify.com/)

> Responsive text clamping component. Inspired by [react-clamp-lines](https://github.com/zoltantothcom/react-clamp-lines), but smaller (~1KB).

## Install

```
npm install nanoclamp --save
```


## Usage
```jsx
import NanoClamp from 'nanoclamp';

<NanoClamp
  className="custom-class"
  is="p"
  lines="4"
  text={'Some text to clamp.'}
/>

```

## API

prop | type | default&#160;value | description |
-----|------|--------------------|-------------|
className | `string` |  | CSS classname(s) added to the string
is | `string` | `'div'` | DOM selector used to render the string
lines | `number` | `3` | Number of visible lines
text | `string` |  | Text you wish to clamp

## License

**nanoclamp** © [Microlink](https://microlink.io), Released under the [MIT](https://github.com/microlinkhq/nanoclamp/blob/master/LICENSE.md) License.<br>
Adapted from [`react-clamp-lines`](https://github.com/zoltantothcom/react-clamp-lines) by Brad Adams with help from [contributors](https://github.com/microlinkhq/nanoclamp/contributors).

> [microlink.io](https://microlink.io) · GitHub [@MicrolinkHQ](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
