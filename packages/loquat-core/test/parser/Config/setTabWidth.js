"use strict";

const { expect } = require("chai");

const { Config } = _parser;

describe("#setTabWidth", () => {
  it("should create a copy of the config with `tabWidth` updated", () => {
    const config  = new Config({ tabWidth: 8, unicode: false });
    const copy = config.setTabWidth(4);
    expect(copy).to.not.equal(config);
    expect(copy).to.be.an.equalConfigTo(new Config({ tabWidth: 4, unicode: false }));
  });
});
