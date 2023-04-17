const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument("en", "let me show pet", "pet");
manager.addDocument("en", "pets", "pet");
manager.addDocument("en", "what kind of pet?", "pet");
manager.addDocument("en", "I need pet.", "pet");

manager.addDocument("en", "toy", "toy");
manager.addDocument("en", "toys", "toy");
manager.addDocument("en", "let me show toys", "toy");
manager.addDocument("en", "Let me show toys for pets", "toy");
manager.addDocument("en", "pets toy", "toy");
manager.addDocument("en", "toys of pet", "toy");

manager.addDocument("en", "dog toy", "dog");
manager.addDocument("en", "dogs", "dog");
manager.addDocument("en", "dog", "dog");
manager.addDocument("en", "pet dog", "dog");
manager.addDocument("en", "pet dog toy", "dog");
manager.addDocument("en", "I need dog toy", "dog");
manager.addDocument("en", "Would you please let me show dog toys?", "dog");
manager.addDocument("en", "What kind of dog toys are there?", "dog");

manager.addDocument("en", "cat toy", "cat");
manager.addDocument("en", "cats", "cat");
manager.addDocument("en", "cat", "cat");
manager.addDocument("en", "I need cat toy", "cat");
manager.addDocument("en", "Would you please let me show cat toys?", "cat");
manager.addDocument("en", "What kind of cat toys are there?", "cat");

manager.addDocument("en", "bird toy", "bird");
manager.addDocument("en", "birds", "bird");
manager.addDocument("en", "bird", "bird");
manager.addDocument("en", "I need bird toy", "bird");
manager.addDocument("en", "Would you please let me show bird toys?", "bird");
manager.addDocument("en", "What kind of bird toys are there?", "bird");

// Train also the NLG
manager.addAnswer("en", "toy", "Which pet do you mean?");

// Train and save the model.
(async () => {
  await manager.train();
  manager.save();
  //   const response = await manager.process("en", "I should go now");
  //   console.log(response);
})();
