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

describe("integer", () => {
  it("should be a parser that parses an integer", () => {
    const def = LanguageDef.create({});
    const { integer } = makeTokenParser(def);
    expect(integer).to.be.a.parser;
    // csucc
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "0UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 2),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        0,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 2),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "+0UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 3),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        0,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 3),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "-0UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 3),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        -0,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 3),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "0x90ABCDEFUVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 11),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "hexadecimal digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        0x90ABCDEF,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 11),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "+0x90ABCDEFUVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 12),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "hexadecimal digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        0x90ABCDEF,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 12),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "-0x90ABCDEFUVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 12),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "hexadecimal digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        -0x90ABCDEF,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 12),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "0o12345670UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 11),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "octal digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        2739128, // 0o12345670
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 11),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "+0o12345670UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 12),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "octal digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        2739128, // 0o12345670
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 12),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "-0o12345670UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 12),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "octal digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        -2739128, // -0o12345670
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 12),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "01234567890UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 12),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        1234567890,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 12),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "+01234567890UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 13),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        +1234567890,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 13),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "-01234567890UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 13),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        -1234567890,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 13),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "1234567890UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 11),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        1234567890,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 11),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "+ 1234567890 UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 14),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        1234567890,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 14),
          "none"
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "- 1234567890 UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.csucc(
        new StrictParseError(
          new SourcePos("main", 1, 14),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
          ]
        ),
        -1234567890,
        new State(
          new Config({ tabWidth: 8 }),
          "UVW",
          new SourcePos("main", 1, 14),
          "none"
        )
      ));
    }
    // cfail
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "0xUVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.cfail(
        new StrictParseError(
          new SourcePos("main", 1, 3),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "hexadecimal digit"),
          ]
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "0oUVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.cfail(
        new StrictParseError(
          new SourcePos("main", 1, 3),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")),
            ErrorMessage.create(ErrorMessageType.EXPECT, "octal digit"),
          ]
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "-UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.cfail(
        new StrictParseError(
          new SourcePos("main", 1, 2),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // lexeme
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // 0
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // decimal
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
          ]
        )
      ));
    }
    {
      const initState = new State(
        new Config({ tabWidth: 8 }),
        "+UVW",
        new SourcePos("main", 1, 1),
        "none"
      );
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.cfail(
        new StrictParseError(
          new SourcePos("main", 1, 2),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // lexeme
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // 0
            ErrorMessage.create(ErrorMessageType.EXPECT, ""),
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // decimal
            ErrorMessage.create(ErrorMessageType.EXPECT, "digit"),
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
      const res = integer.run(initState);
      expect(res).to.be.an.equalResultTo(Result.efail(
        new StrictParseError(
          new SourcePos("main", 1, 1),
          [
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // -
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // +
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // lexeme
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // 0
            ErrorMessage.create(ErrorMessageType.SYSTEM_UNEXPECT, show("U")), // decimal
            ErrorMessage.create(ErrorMessageType.EXPECT, "integer"),
          ]
        )
      ));
    }
  });
});
