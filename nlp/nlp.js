const { containerBootstrap } = require("@nlpjs/core");
const { DomainManager, NluNeural } = require("@nlpjs/nlu");
const { LangEn } = require("@nlpjs/lang-en");
const natural = require("natural");

const fs = require("fs");
const model = require("./testModel.json");

const text = "Ball for a small birds";

const contents = natural.PorterStemmer.tokenizeAndStem(text);
(async () => {
  const container = await containerBootstrap();
  container.use(NluNeural);
  container.use(LangEn);
  // Set trainByDomain to true to train by domain
  const manager = new DomainManager({ container, trainByDomain: false });
  manager.fromJSON(model);
  for (i in contents) {
    // console.log(contents[i]);
    const actual = await manager.process(contents[i]);
    console.log("-----", contents[i], actual);
  }
})();
