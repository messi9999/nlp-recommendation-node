const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { similarity } = require("@nlpjs/similarity");
const { NlpManager } = require("node-nlp");

const getData = require("../openaicom");

// const keyword_extractor = require("keyword-extractor");
const fs = require("fs");

const categoryExtractor = express.Router();
// var dataset = new Object();

const data = fs.readFileSync(__dirname + "\\" + "model.nlp", "utf8");
const manager = new NlpManager();
manager.import(data);

// categoryExtractor.get(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     fs.readFile(__dirname + "/pet-category.json", "utf-8", (err, data) => {
//       // console.log(data);
//       // var dataset = data;
//       res.end(data);
//       // res.status(201).send(data);
//     });
//   })
// );

var catData = new Object();
var category = new Object();
var pets = new Object();
var dogToys = new Object();
var catToys = new Object();
var birdToys = new Object();
var fishToys = new Object();

function getDatabase() {
  fs.readFile(__dirname + "/pet-category.json", "utf-8", async (err, data) => {
    catData = await JSON.parse(data);
    category = await catData["Category"];
    pets = await catData["Pets"];
    dogToys = await catData["Toys"]["Dog"];
    catToys = await catData["Toys"]["Cat"];
    birdToys = await catData["Toys"]["Bird"];
    fishToys = await catData["Toys"]["Fish"];
    products = await catData["Products"];
  });
}
getDatabase();

const chooseRandom = (arr, num = 1) => {
  const res = [];
  // if (num < arr.length) {
  //   num = arr.length;
  // }
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

categoryExtractor.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const sentence = req.body.sentence;
    console.log(sentence);
    // const extraction_result = keyword_extractor.extract(sentence, {
    //   language: "english",
    //   remove_digits: true,
    //   return_changed_case: true,
    //   remove_duplicates: false,
    // });

    const result = await manager.process("en", sentence);

    if (result.answer == null) {
      var summary;
      var toys;
      var answers = new Object();
      var recommends;
      switch (result.intent) {
        case "pet":
          console.log("pet");
          recommends = chooseRandom(products, (num = 5));
          summary = await getData("Summary of pet toys");
          answers = {
            intents: pets,
            summary: summary,
            recommends: recommends,
          };
          res.status(201).send({
            message: "keywords",
            answers: answers,
            isquestion: false,
          });
          break;
        case "dog":
          console.log("dog");
          toys = chooseRandom(dogToys, (num = 5));
          var prompt = "Summary of the   ";
          for (let i = 0; i < toys.length - 1; i++) {
            prompt += toys[i];
            prompt += ", ";
          }
          prompt += toys[toys.length - 1];
          prompt += " toys for dogs";
          summary = await getData(prompt);
          recommends = chooseRandom(products, (num = 5));
          answers = {
            intents: toys,
            summary: summary,
            recommends: recommends,
          };
          res.status(201).send({
            message: "keywords",
            answers: answers,
            isquestion: false,
          });
          break;
        case "cat":
          console.log("cat");
          toys = chooseRandom(catToys, (num = 5));
          var prompt = "Summary of the   ";
          for (let i = 0; i < toys.length - 1; i++) {
            prompt += toys[i];
            prompt += ", ";
          }
          prompt += toys[toys.length - 1];
          prompt += " toys for cats";
          summary = await getData(prompt);
          recommends = chooseRandom(products, (num = 5));
          answers = {
            intents: toys,
            summary: summary,
            recommends: recommends,
            isquestion: false,
          };
          res.status(201).send({
            message: "keywords",
            answers: answers,
          });
          break;
        default:
          console.log("None");
      }
    } else {
      console.log(result.answer);
      res.status(201).send({
        message: "keywords",
        answers: result.answer,
        isquestion: true,
      });
    }
    // res.status(201).send({ message: "keywords", result: "Good!" });

    // for (let i = 0; i < extraction_result.length; i++) {
    //   // console.log(extraction_result[i]);
    //   console.log(`${similarity(extraction_result[i], "pet", true)}`);
    // }
  })
);

module.exports = categoryExtractor;
