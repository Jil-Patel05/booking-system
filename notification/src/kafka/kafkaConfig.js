const { Kafka } = require("kafkajs");

exports.Kafka = new Kafka({
    brokers: ["192.168.1.8:9092"],
    clientId: "my-app",
});