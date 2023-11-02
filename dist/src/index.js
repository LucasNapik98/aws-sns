"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const client_sns_1 = require("@aws-sdk/client-sns");
const credential_providers_1 = require("@aws-sdk/credential-providers");
const topic = (0, core_1.getInput)("topic", {
  trimWhitespace: true,
});
const subject = (0, core_1.getInput)("subject", {
  required: false,
  trimWhitespace: true,
});
const message = (0, core_1.getInput)("message", {
  required: true,
});
const client = new client_sns_1.SNSClient({
  credentials: (0, credential_providers_1.fromEnv)(),
});
publishMessage(topic, message, subject)
  .then((response) => {
    (0, core_1.setOutput)("message_id", response.MessageId);
  })
  .catch((e) => {
    (0, core_1.setFailed)(e);
  });
function publishMessage(topic, message, subject) {
  return client.send(
    new client_sns_1.PublishCommand({
      TopicArn: topic,
      Subject: subject,
      Message: message,
    })
  );
}
