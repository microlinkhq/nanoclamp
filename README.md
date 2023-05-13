<div align="center">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner.png#gh-light-mode-only" alt="microlink logo">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner-dark.png#gh-dark-mode-only" alt="microlink logo">
  <br>
  <br>
</div>

[![Last version](https://img.shields.io/github/tag/microlinkhq/nanoclamp.svg?style=flat-square)](https://github.com/microlinkhq/nanoclamp/releases)
[![NPM Status](https://img.shields.io/npm/dm/nanoclamp.svg?style=flat-square)](https://www.npmjs.org/package/nanoclamp)

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
  lines={2}
  text={'Some text to clamp.'}
/>
```

## API

| prop          | type      | default | description                                                             |
|---------------|-----------|---------|-------------------------------------------------------------------------|
| accessibility | `boolean` | `true`  | Pass the full _unclamped_ string to the DOM element's `title` attribute |
| className     | `string`  |         | CSS classname(s) added to the string                                    |
| debounce      | `number`  | `300`   | Time in milliseconds used for debounce                                  |
| ellipsis      | `string`  | `'…'`   | String displayed after the clamped `text`                               |
| is            | `string`  | `'div'` | DOM selector used to render the string                                  |
| lines         | `number`  | `3`     | Number of visible lines                                                 |
| text          | `string`  |         | Text you wish to clamp                                                  |

## License

**nanoclamp** © [Microlink](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/nanoclamp/blob/master/LICENSE.md) License.<br>
Adapted from [`react-clamp-lines`](https://github.com/zoltantothcom/react-clamp-lines) by Brad Adams with help from [contributors](https://github.com/microlinkhq/nanoclamp/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlinkhq](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
