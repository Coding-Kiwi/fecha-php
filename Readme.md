# fecha-php

[![Build Status](https://drone.codingkiwi.dev/api/badges/codingkiwi/fecha-php/status.svg)](https://drone.codingkiwi.dev/codingkiwi/fecha-php)

Simple tool to convert from php datetime format to [fecha](https://www.npmjs.com/package/fecha) format (~960 Bytes minified + gzipped)

This is useful if you for example have a js datepicker in a laravel php application and you want to use the same format at both places.

## Usage

[npm fecha-php](https://www.npmjs.com/package/fecha-php)
```
npm i fecha-php
```

```js
const convert = require("fecha-php");


const phpFormat = convert.fechaToPhp("YY-MM-DD HH:mm:ss")
// phpFormat = "y-m-d H:i:s"

const fechaFormat = convert.phpToFecha("y-m-d H:i:s")
// fechaFormat = "YY-MM-DD HH:mm:ss"
```