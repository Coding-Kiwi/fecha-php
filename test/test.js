const convert = require("../dist/index.min.js");
const fecha = require("fecha");
const assert = require("assert");
const { execSync } = require('child_process');

const fechaDates = [
    "MMMM Do, YYYY",
    "YY-MM-DD HH:mm:ss",
    "ddd MMM DD YYYY HH:mm:ss",
    "M/D/YY",
    "MMM D, YYYY",
    "MMMM D, YYYY",
    "dddd, MMMM D, YYYY",
    "HH:mm",
    "HH:mm:ss",
    "HH:mm [asd] HH:mm"
];

const phpDates = [
    "F jS, Y",
    "y-m-d H:i:s",
    "D M d Y H:i:s",
    "n/j/y",
    "M j, Y",
    "F j, Y",
    "l, F j, Y",
    "H:i",
    "H:i:s",
    "d.m.Y H:i",
    "d.m.Y \a\s\d H:i",
];

process.env.TZ = 'Europe/Berlin';

describe('fechaToPhp', function() {
    for (const date of fechaDates) {
        let converted = convert.fechaToPhp(date);

        it('Output of "' + date + '" and "' + converted + '" should match', function() {
            let phpDate = execSync('php -r "date_default_timezone_set(\'' + process.env.TZ + '\'); echo date(\'' + converted + '\');"').toString();
            let fechaDate = fecha.format(new Date(), date);
            assert.equal(phpDate, fechaDate);
        })
    }
});

describe('phpToFecha', function() {
    for (const date of phpDates) {
        let converted = convert.phpToFecha(date);

        it('Output of "' + date + '" and "' + converted + '" should match', function() {
            let phpDate = execSync('php -r "date_default_timezone_set(\'' + process.env.TZ + '\'); echo date(\'' + date + '\');"').toString();
            let fechaDate = fecha.format(new Date(), converted);
            assert.equal(phpDate, fechaDate);
        })
    }
});