"use strict";

const { expect } = require("chai");

const { Config } = $parser;

describe(".constructor", () => {
  it("should create a new `Config` instance", () => {
    // use default argument
    {
      const config = new Config();
      expect(config).to.be.an.instanceOf(Config);
      expect(config.tabWidth).to.equal(1);
      expect(config.unicode).to.equal(true);
    }
    // use default parameters
    {
      const config = new Config({});
      expect(config).to.be.an.instanceOf(Config);
      expect(config.tabWidth).to.equal(1);
      expect(config.unicode).to.equal(true);
    }
    // use specified parameters
    {
      const config = new Config({
        tabWidth: 4,
        unicode : true,
      });
      expect(config).to.be.an.instanceOf(Config);
      expect(config.tabWidth).to.equal(4);
      expect(config.unicode).to.equal(true);
    }
  });
});
