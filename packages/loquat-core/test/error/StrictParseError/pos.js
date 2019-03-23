"use strict";

const { expect } = require("chai");

const { SourcePos } = _pos;
const { ErrorMessageType, ErrorMessage, StrictParseError } = _error;

describe("#pos", () => {
  it("should get position of the error", () => {
    const pos = new SourcePos("main", 496, 6, 28);
    const msgs = [
      ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, "foo"),
      ErrorMessage.create(ErrorMessageType.UNEXPECT, "bar"),
      ErrorMessage.create(ErrorMessageType.EXPECT, "baz"),
      ErrorMessage.create(ErrorMessageType.MESSAGE, "qux"),
    ];
    const err = new StrictParseError(pos, msgs);
    expect(err.pos).to.be.an.equalPositionTo(pos);
  });
});