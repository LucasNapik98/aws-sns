import { getInput, setOutput, setFailed } from "@actions/core";
import {
  SNSClient,
  PublishCommand,
  PublishCommandOutput,
} from "@aws-sdk/client-sns";
import { fromEnv } from "@aws-sdk/credential-providers";

const topic = getInput("topic", {
  trimWhitespace: true,
});

const subject = getInput("subject", {
  required: false,
  trimWhitespace: true,
});

const message = getInput("message", {
  required: true,
});

const client = new SNSClient({
  credentials: fromEnv(),
});

publishMessage(topic, message, subject)
  .then((response) => {
    setOutput("message_id", response.MessageId);
  })
  .catch((e) => {
    setFailed(e);
  });

function publishMessage(
  topic: string,
  message: string,
  subject?: string
): Promise<PublishCommandOutput> {
  return client.send(
    new PublishCommand({
      TopicArn: topic,
      Subject: subject,
      Message: message,
    })
  );
}
