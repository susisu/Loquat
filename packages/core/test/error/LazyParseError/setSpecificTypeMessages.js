"use strict";

const { expect } = require("chai");

const { SourcePos } = $pos;
const { ErrorMessageType, ErrorMessage, StrictParseError, LazyParseError } = $error;

describe("#setSpecificTypeMessages", () => {
  it("should create a new parse error with all of the specified type of messages removed and the"
    + " new messages added", () => {
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
    const newErr = err.setSpecificTypeMessages(ErrorMessageType.UNEXPECT, ["A", "B"]);
    expect(evaluated).to.be.false; // not evaluated yet
    expect(SourcePos.equal(newErr.pos, pos)).to.be.true;
    expect(ErrorMessage.messagesEqual(newErr.msgs, [
      ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, "foo"),
      ErrorMessage.create(ErrorMessageType.EXPECT, "baz"),
      ErrorMessage.create(ErrorMessageType.MESSAGE, "qux"),
      ErrorMessage.create(ErrorMessageType.UNEXPECT, "A"),
      ErrorMessage.create(ErrorMessageType.UNEXPECT, "B"),
    ])).to.be.true;
    expect(evaluated).to.be.true;
  });
});
