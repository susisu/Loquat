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

describe("hexadecimal", () => {
  it("should be a parser that parses hexadecimal digits after a character X/x and returns an parsed"
    + " integer", () => {
    const def = LanguageDef.create({});
    const { hexadecimal } = makeTokenParser(def);
    expect(hexadecimal).to.be.a.parser;
    // csucc
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "X12345678UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = hexadecimal.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 10),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "hexadecimal digit"),
          ]
        ),
        0x12345678,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 10),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "x90ABCDEF UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = hexadecimal.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 10),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show(" ")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "hexadecimal digit"),
          ]
        ),
        0x90ABCDEF,
        new State(
          new Config({ tabWidth: 8 }),
          " UVW",
          new SourcePos("main", 1, 10),
          "none"
        )
      ));
    }
    // cfail
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "xUVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = hexadecimal.run(initState);
      expect(res).to.be.an.equalResultTo(Result.cfail(
        new StrictParseError(
          new SourcePos("main", 1, 2),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "hexadecimal digit"),
          ]
        )
      ));
    }
    // efail
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = hexadecimal.run(initState);
      expect(res).to.be.an.equalResultTo(Result.efail(
        new StrictParseError(
          new SourcePos("main", 1, 1),
          [ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U"))]
        )
      ));
    }
  });
});
