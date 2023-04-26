const { containerBootstrap } = require("@nlpjs/core");
const { DomainManager, NluNeural } = require("@nlpjs/nlu");
const { LangEn } = require("@nlpjs/lang-en");
const natural = require("natural");

const fs = require("fs");
const model = require("./testModel.json");

const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { join } = require("path");

const nlpRouter = express.Router();
const question_size = [
  "Do you need big or small size?",
  "Please select the size of the pet?",
  "You can choose one of these size",
];
const question_type = [
  "Please choose one of these toys",
  "What kind of toy do you want?",
  "Please select the type of toy",
];
const question_pet = [
  "For which pet?",
  "Please choose the pet",
  "Dog, cat, bird or small animal?",
];
const question_seller = [
  "Which seller do you want?",
  "Please choose the seller",
];
const chooseRandom = (arr, num = 1) => {
  const res = [];
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
};

nlpRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const sentence = req.body.sentence;
    const flag = req.body.flag;
    var acutal = [];

    const contents = natural.PorterStemmer.tokenizeAndStem(sentence);

    (async () => {
      const container = await containerBootstrap();

      container.use(NluNeural);
      container.use(LangEn);
      // Set trainByDomain to true to train by domain
      const manager = new DomainManager({ container, trainByDomain: false });
      manager.fromJSON(model);

      for (i in contents) {
        // console.log(contents[i]);
        const item = await manager.process(contents[i]);
        acutal.push(await manager.process(contents[i]));
        for (j in item.classifications) {
          if (item.classifications[j].score == 1) {
            switch (item.classifications[j].intent) {
              case "size":
                flag.size.key = item.domain;
                flag.size.value = contents[i];
                break;
              case "type":
                flag.type.key = item.domain;
                flag.type.value = contents[i];
                break;
              case "pet":
                flag.pet.key = item.domain;
                flag.pet.value = contents[i];
                break;
              case "seller":
                flag.seller.key = item.domain;
                flag.seller.value = contents[i];
                break;
            }
          }
        }
      }
      let question = "";
      if (flag.size.value == "") {
        question = chooseRandom(question_size, 1);
      } else if (flag.type.value == "") {
        question = chooseRandom(question_type, 1);
      } else if (flag.pet.value == "") {
        question = chooseRandom(question_pet, 1);
      } else if (flag.seller.value == "") {
        question = chooseRandom(question_seller, 1);
      } else {
        question = "";
      }
      var answers = {
        flag: flag,
        question: question,
      };
      res.status(201).send({
        message: "keywords",
        answers: answers,
      });
    })();
  })
);

module.exports = nlpRouter;
