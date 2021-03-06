"use strict";

const { expect } = require("chai");

const { SourcePos } = $pos;
const { ErrorMessageType, ErrorMessage, StrictParseError, LazyParseError } = $error;

describe("#msgs", () => {
  it("should evaluate the thunk and return `msgs` of the result", () => {
    const pos = new SourcePos("main", 6, 28);
    const msgs = [
      ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, "foo"),
      ErrorMessage.create(ErrorMessageType.UNEXPECT, "bar"),
      ErrorMessage.create(ErrorMessageType.EXPECT, "baz"),
      ErrorMessage.create(ErrorMessageType.MESSAGE, "qux"),
    ];
    let evaluated = false;
    const err = new LazyParseError(() => {
      evaluated = true;
      return new StrictParseError(pos, msgs);
    });
    expect(ErrorMessage.messagesEqual(err.msgs, msgs)).to.be.true;
    expect(evaluated).to.be.true;
  });
});
