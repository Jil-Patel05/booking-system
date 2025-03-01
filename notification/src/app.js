const express = require("express");
const { consumeMessages } = require("./kafka/kafka");
const app = express();

// configure kafka js to consume data
consumeMessages()
  .then(() => {
    console.log("Messages are consumed by consumer");
  })
  .catch((err) => {
    console.log(`There is an error in message consumption, ${err}`);
  });

module.exports = { app };
