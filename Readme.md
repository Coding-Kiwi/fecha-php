# fecha-php

Simple tool to convert from php datetime format to fecha format

This is useful if you for example have a js datepicker in a laravel php application and you want to use the same format at both places.

## Usage

[npm @codingkiwi/fecha-php](https://www.npmjs.com/package/@codingkiwi/fecha-php)
```
npm i @codingkiwi/fecha-php
```

```js
const convert = require("@codingkiwi/fecha-php");


const phpFormat = convert.fechaToPhp("YY-MM-DD HH:mm:ss")
// phpFormat = "y-m-d H:i:s"

const fechaFormat = convert.phpToFecha("y-m-d H:i:s")
// fechaFormat = "YY-MM-DD HH:mm:ss"
```