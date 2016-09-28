/*
 * loquat-core test / pos.SourcePos#setLine()
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai = require("chai");
const expect = chai.expect;

const _pos = require("pos.js");
const SourcePos = _pos.SourcePos;

describe("#setLine(line)", () => {
    it("should create a copy of the `SourcePos' object with the specified line", () => {
        let pos  = new SourcePos("foobar", 496, 28);
        let copy = pos.setLine(6);
        // different objects
        expect(copy).not.to.equal(pos);
        // with different lines
        expect(copy.name).to.equal("foobar");
        expect(copy.line).to.equal(6);
        expect(copy.column).to.equal(28);
    });
});
