"use strict";

const { expect } = require("chai");

const {
  show,
  SourcePos,
  ErrorMessageType,
  ErrorMessage,
  StrictParseError,
  Config,
  State,
  Result,
} = $core;

const { LanguageDef } = $language;
const { makeTokenParser } = $token;

describe("colon", () => {
  it("should be a parser that parsea a colon", () => {
    const def = LanguageDef.create({});
    const { colon } = makeTokenParser(def);
    expect(colon).to.be.a.parser;
    // csucc
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        ": ABC",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = colon.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 3),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("A")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        ":",
        new State(
          new Config({ tabWidth: 8 }),
          "ABC",
          new SourcePos("main", 1, 3),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        ":ABC",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = colon.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 2),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("A")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        ":",
        new State(
          new Config({ tabWidth: 8 }),
          "ABC",
          new SourcePos("main", 1, 2),
          "none"
        )
      ));
    }
    // efail
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "ABC",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = colon.run(initState);
      expect(res).to.be.an.equalResultTo(Result.efail(
        new StrictParseError(
          new SourcePos("main", 1, 1),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("A")),
            ErrorMessage.create(ErrorMessageType.EXPECT, show(":")),
          ]
        )
      ));
    }
  });
});
