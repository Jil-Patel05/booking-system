const { TOPICS } = require("../common/common");
const { Kafka } = require("./kafkaConfig");
const { handleIncomingMessages } = require("../helpers/handleIncomingMessages");

function listOfTopics() {
  let topics = [];
  Object.keys(TOPICS).forEach((key) => {
    topics.push(TOPICS[key]);
  });

  return topics;
}

function connectConsumer() {
  const consumer = Kafka.consumer({ groupId: "notification" });
  return consumer;
}

// need more optimization here
async function consumeMessages() {
  const consumer = connectConsumer();

  const topicList = listOfTopics();
  await consumer.subscribe({ topics: topicList });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      handleIncomingMessages(JSON.parse(message.value.toString()));
    },
  });
}

module.exports = { consumeMessages };
