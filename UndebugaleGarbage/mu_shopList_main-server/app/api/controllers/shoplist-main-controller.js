"use strict";
const ShopListMainAbl = require("../../abl/shoplist-main-abl.js");

class ShopListMainController {
  init(ucEnv) {
    return ShopListMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShopListMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShopListMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShopListMainController();
