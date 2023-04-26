const { containerBootstrap } = require("@nlpjs/core");
const { DomainManager, NluNeural } = require("@nlpjs/nlu");
const { LangEn } = require("@nlpjs/lang-en");

const fs = require("fs");

function addSizeDomain(manager) {
  manager.add("Size", "small", "size");
  manager.add("Size", "large", "size");
  manager.add("Size", "big", "size");
  manager.add("Size", "tiny", "size");
  manager.add("Size", "tini", "size");
  manager.add("Size", "hug", "size");
  manager.add("Size", "size", "size");
}

function addTypeDomain(manager) {
  manager.add("Type", "Pull", "type");
  manager.add("Type", "Ball", "type");
  manager.add("Type", "Tunnels", "type");
  manager.add("Type", "Catrip toys", "type");
  manager.add("Type", "Mice & Animal Toys", "type");
  manager.add("Type", "Feather Toys", "type");
  manager.add("Type", "tug", "type");
  manager.add("Type", "Bunny", "type");
  manager.add("Type", "Bunni", "type");
}

function addPetDomain(manager) {
  manager.add("Pet", "dog", "pet");
  manager.add("Pet", "cat", "pet");
  manager.add("Pet", "bird", "pet");
  manager.add("Pet", "horse", "pet");
  manager.add("Pet", "hors", "pet");
}

function addSellerDomain(manager) {
  manager.add("Sell", "seller", "seller");
  // manager.add("Sell", "Cokliomc", "seller");
  // manager.add("Sell", "Skylety", "seller");
  // manager.add("Sell", "Wesco Pet, Inc", "seller");
  // manager.add("Sell", "QDAN", "seller");
  // manager.add("Sell", "Fuufome", "seller");
  // manager.add("Sell", "Central Garden & Pet", "seller");
  // manager.add("Sell", "RYPET", "seller");
  // manager.add("Sell", "nan", "seller");
  // manager.add("Sell", "Bonka Bird Toys", "seller");
  // manager.add("Sell", "JK005", "seller");
  // manager.add("Sell", "SMANGY", "seller");
  // manager.add("Sell", "Bissap", "seller");
  // manager.add("Sell", "Buluer", "seller");
  // manager.add("Sell", "KATUMO", "seller");
  // manager.add("Sell", "RF-X", "seller");
  // manager.add("Sell", "ULIGOTA", "seller");
  // manager.add("Sell", "Sofier", "seller");
}

(async () => {
  const container = await containerBootstrap();
  container.use(NluNeural);
  container.use(LangEn);
  // Set trainByDomain to true to train by domain
  const manager = new DomainManager({ container, trainByDomain: false });
  addSizeDomain(manager);
  addTypeDomain(manager);
  addPetDomain(manager);
  addSellerDomain(manager);
  await manager.train();
  const model = manager.toJSON();
  fs.writeFile("testModel.json", JSON.stringify(model), "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("Model file has been saved.");
  });
})();
