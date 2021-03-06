"use strict";

const { expect, AssertionError } = require("chai");

const { SourcePos } = $core;

describe("equalPositionTo", () => {
  it("should throw AssertionError if the actual position is not equal to the expected one", () => {
    // name
    expect(() => {
      const act = new SourcePos("main", 6, 28);
      const exp = new SourcePos("lib", 6, 28);
      expect(act).to.be.an.equalPositionTo(exp);
    }).to.throw(AssertionError, /SourcePos/);
    // line
    expect(() => {
      const act = new SourcePos("main", 6, 28);
      const exp = new SourcePos("main", 7, 28);
      expect(act).to.be.an.equalPositionTo(exp);
    }).to.throw(AssertionError, /SourcePos/);
    // column
    expect(() => {
      const act = new SourcePos("main", 6, 28);
      const exp = new SourcePos("main", 6, 29);
      expect(act).to.be.an.equalPositionTo(exp);
    }).to.throw(AssertionError, /SourcePos/);
    // all
    expect(() => {
      const act = new SourcePos("main", 6, 28);
      const exp = new SourcePos("lib", 7, 29);
      expect(act).to.be.an.equalPositionTo(exp);
    }).to.throw(AssertionError, /SourcePos/);
    // negated
    expect(() => {
      const act = new SourcePos("main", 6, 28);
      const exp = new SourcePos("main", 6, 28);
      expect(act).to.not.be.an.equalPositionTo(exp);
    }).to.throw(AssertionError, /SourcePos/);
  });

  it("should not throw AssertionError if the actual position is equal to the expected one", () => {
    expect(() => {
      const act = new SourcePos("main", 6, 28);
      const exp = new SourcePos("main", 6, 28);
      expect(act).to.be.an.equalPositionTo(exp);
    }).to.not.throw(AssertionError);
  });

  it("should throw AssertionError if the object is not a `SourcePos` instance", () => {
    const values = [
      null,
      undefined,
      "foo",
      42,
      true,
      {},
      () => {},
    ];
    const exp = new SourcePos("main", 6, 28);
    for (const act of values) {
      expect(() => {
        expect(act).to.be.an.equalPositionTo(exp);
      }).to.throw(AssertionError, /SourcePos/);
      expect(() => {
        expect(act).to.not.be.an.equalPositionTo(exp);
      }).to.throw(AssertionError, /SourcePos/);
    }
  });
});
