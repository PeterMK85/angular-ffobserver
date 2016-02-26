# angular-ffobserver
> Fontfaceobserver Angular >=1.4  wrapper directive


# Overview
angular-ffobserver is an angular implementation of the [fontfaceobserver](https://github.com/bramstein/fontfaceobserver).
### From the original Fontfaceobserver description:
Font Face Observer is a small `@font-face` loader and monitor (3.5KB minified and 1.3KB gzipped) compatible with any web font service. It will monitor when a web font is applied to the page and notify you. It does not limit you in any way in where, when, or how you load your web fonts. Unlike the [Web Font Loader](https://github.com/typekit/webfontloader) Font Face Observer uses scroll events to detect font loads efficiently and with minimum overhead.

# Getting started

## Installing
```
npm install angular-ffobserver
```
**angular-ffobserver requires `ngCookies >=1.4`.** The $cookies method changed with 1.4 if you need earlier support please let me know.

### You need to include Fontfaceobserver plugin also
```
$ npm install fontfaceobserver
```
And include it into your vendor scripts.
```
fontfaceobserver/fontfaceobserver.js
```
**Please note you need to determine if you need want to include with or without [Promise fallback](http://caniuse.com/#search=Promise).**

### Declare in your module
``` javascript
  angular.module('app', [
    'angular-ffobserver'
  ])
```

### Declare in your markup
Call the directive with the requested attributes
``` html
<body data-ffobserver=""
      data-ffobserver-fonts='[["roboto", {"weight": 200}],["roboto-light", {"weight": 200}]]'
      data-ffobserver-class="font-loaded--roboto"
      data-ffobserver-cookie-key="font-loaded"
      data-ffobserver-cookie-value="roboto"></body>
```
**Recommend to use it on the body element**

### Declare in your CSS
Declare the fontface itself
``` scss
@font-face{
  font-family:"roboto-light";
  src:url("../fonts/roboto-light.woff2") format("woff2"), url("../fonts/roboto-light.woff") format("woff"), url("../fonts/roboto-light.svg#roboto-light") format("svg");
  font-weight:200;
  font-style:normal;
  font-stretch:normal
}
```

Add the class modifier for the requested element
``` scss
body {
  font-family: Arial, Helvetica, sans-serif;
  &.font-loaded--roboto {
      font-family: 'roboto-light', Arial, Helvetica, sans-serif;
      font-weight: 200;
  }
}
```
**As you can see this example shows that the Body font style will be rendered with Arial until the `Fontfaceobserver` not resolved and apply a class `font-loaded--roboto` on the body**
