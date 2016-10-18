/*
 * loquat-monad test / monad
 * copyright (c) 2016 Susisu
 */

"use strict";

describe("monad", () => {
    require("./monad/forever.js");
    require("./monad/discard.js");
    require("./monad/join.js");
    require("./monad/when.js");
    require("./monad/unless.js");
    require("./monad/liftM.js");
});