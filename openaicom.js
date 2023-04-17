const axios = require("axios");

require("dotenv").config();

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
};

const getData = async (prom) => {
  const reqestBody = {
    model: "text-davinci-003",
    prompt: prom,
    max_tokens: 500,
    temperature: 0.1,
    n: 1,
  };
  var answer;
  var iserror;
  const response = await axios
    .post("https://api.openai.com/v1/completions", reqestBody, config)
    .catch((error) => {
      iserror = true;
    });
  if (iserror) {
    answer = "OpenAI failed!";
  } else {
    const data = await response;
    answer = data.data.choices[0].text;
  }
  return answer;
};

module.exports = getData;
