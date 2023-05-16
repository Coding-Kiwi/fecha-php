const fechaToken = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
const fechaLiteral = /\[([^]*?)\]/gm;

const phpToken = /jS|[dDjlNSwzWFmMntLoYyaABgGhHisuveIOPpTZcru]/g;
const phpLiteral = /\\[^]/gm

const dictionary = {
    toFecha: {
        d: "DD",
        D: "ddd",
        j: "D",
        l: "dddd",
        N: null,
        S: null,
        w: "d",
        z: null,
        W: null,
        F: "MMMM",
        m: "MM",
        M: "MMM",
        n: "M",
        t: null,
        L: null,
        o: null,
        Y: "YYYY",
        y: "YY",
        a: "a",
        A: "A",
        B: null,
        g: "h",
        G: "H",
        h: "hh",
        H: "HH",
        i: "mm",
        s: "ss",
        u: null,
        v: "SSS",
        e: null,
        I: null,
        O: "ZZ",
        P: "Z",
        p: null,
        T: null,
        Z: null,
        c: "YYYY-MM-DDTHH:mm:ssZ",
        r: "ddd, DD MMM YYYY HH:mm:ss ZZ",
        U: null,
        jS: "Do"
    },
    toPhp: {
        D: "j",
        DD: "d",
        Do: "jS",
        M: "n",
        MM: "m",
        YY: "y",
        h: "g",
        hh: "h",
        H: "G",
        HH: "H",
        m: null,
        mm: "i",
        s: null,
        ss: "s",
        YYYY: "Y",
        S: null,
        SS: null,
        SSS: "v",
        d: "DD",
        dd: null,
        ddd: "D",
        dddd: "l",
        MMM: "M",
        MMMM: "F",
        a: "a",
        A: "A",
        ZZ: "O",
        Z: "P",
    }
};

function regexEscape(str) {
    return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}

function phpToFecha(format) {
    let literals = [];

    let newFormat = format.replace(phpLiteral, ($0, $1) => {
        literals.push($1);
        return "@@@";
    });

    newFormat = regexEscape(newFormat).replace(phpToken, $0 => {
        let p = dictionary.toFecha[$0];
        if (typeof p === "undefined" || p === null) {
            throw new Error("'" + $0 + "' is a valid php format token but there is no equivalent in fecha");
        }

        return p;
    }).replace(/\\([^])/gm, "[$1]");

    return newFormat.replace(/@@@/g, () => literals.shift());
}

function fechaToPhp(format) {
    let literals = [];
    let newFormat = format.replace(fechaLiteral, ($0, $1) => {
        literals.push("\\" + $1.split("").join("\\"));
        return "@@@";
    });

    newFormat = regexEscape(newFormat).replace(fechaToken, $0 => {
        let p = dictionary.toPhp[$0];
        if (typeof p === "undefined" || p === null) {
            throw new Error("'" + $0 + "' is a valid fecha format token but there is no equivalent in php");
        }

        return p;
    }).replace(phpLiteral, "$&");

    return newFormat.replace(/@@@/g, () => literals.shift());
}

export {
    phpToFecha,
    fechaToPhp
}