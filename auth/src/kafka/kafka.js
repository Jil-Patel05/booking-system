const { Kafka } = require("./kafkaConfig");

async function createTopics(topic, numberOfPartion) {
  try {
    console.log("admin connecting....");
    const admin = Kafka.admin();
    admin.connect();
    console.log("admin connected....");

    const topicList = await admin.listTopics();
    if (topicList.includes(topic)) {
      console.log("admin diconnected");
      await admin.disconnect();
      return;
    }

    console.log("Topic creation started");
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
    console.log("Topic crreated successfully");

    await admin.disconnect();
    return;
  } catch (err) {
    console.log("Error while creating topic,", err.message);
  }
}

function connectProducer() {
  const producer = Kafka.producer();
  return producer;
}

async function produceMessage(topic, numberOfPartion, key, message) {
  await createTopics(topic, numberOfPartion);
  console.log("Topic created");
  const producer = connectProducer();
  console.log("producer connected");
  await producer.connect();

  console.log("produce messages");

  await producer.send({
    topic,
    messages: [{ key: "1", value: JSON.stringify(message) }],
  });

  producer.disconnect();
}

module.exports = { produceMessage };
