const { Kafka } = require("./kafkaConfig");

async function createTopics(topic, numberOfPartion) {
  console.log("Creation of topics");
  const admin = Kafka.admin();
  admin.connect();

  const topicList = await admin.listTopics();

  console.log(topicList);

  if (topicList.includes(topic)) {
    await admin.disconnect();
    return;
  }

  console.log("topic creatiin started");

  await admin.createTopics({
    topics: [
      {
        topic: topic,
        numPartitions: numberOfPartion,
      },
    ],
    timeout: 5000,
    validateOnly: false,
  });

  await admin.disconnect();
}

function connectProducer() {
  const producer = Kafka.producer();
  return producer;
}

async function produceMessage(topic, numberOfPartion, key, message) {
  await createTopics(topic, numberOfPartion);
  const producer = connectProducer();
  await producer.connect();

  console.log("produce messages");

  await producer.send({
    topic,
    messages: [{ key: "1", value: JSON.stringify(message) }],
  });

  producer.disconnect();
}

module.exports = { produceMessage };
