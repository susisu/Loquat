/*
 * loquat-char
 * copyright (c) 2016 Susisu
 */

"use strict";

module.exports = (_core, sugar) => {
    let _char = require("./lib/char.js")(_core);

    return Object.freeze({
        string    : _char.string,
        satisfy   : _char.satisfy,
        oneOf     : _char.oneOf,
        noneOf    : _char.noneOf,
        char      : _char.char,
        anyChar   : _char.anyChar,
        space     : _char.space,
        spaces    : _char.spaces,
        newline   : _char.newline,
        tab       : _char.tab,
        upper     : _char.upper,
        lower     : _char.lower,
        letter    : _char.letter,
        digit     : _char.digit,
        alphaNum  : _char.alphaNum,
        octDigit  : _char.octDigit,
        hexDigit  : _char.hexDigit,
        manyChars : _char.manyChars,
        manyChars1: _char.manyChars1,
        regexp    : _char.regexp
    });
};
