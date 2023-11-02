import { getInput, setOutput, error, setFailed } from "@actions/core";
import { context } from "@actions/github";
import {
  SNSClient,
  PublishCommand,
  PublishCommandOutput,
} from "@aws-sdk/client-sns";
import { fromEnv } from "@aws-sdk/credential-providers";

const region = getInput("region", {
  required: true,
  trimWhitespace: true,
});

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
  region,
});

console.log(process.env);

const structure =
  getInput("structure", {
    required: true,
  }) ?? "json";

publishMessage(topic, message, structure, subject)
  .then((response) => {
    setOutput("message_id", response.MessageId);
  })
  .catch((e) => {
    setFailed(e);
  });

function publishMessage(
  topic: string,
  message: string,
  structure: string,
  subject?: string
): Promise<PublishCommandOutput> {
  return client.send(
    new PublishCommand({
      TopicArn: topic,
      Subject: subject,
      Message: message,
      MessageStructure: structure,
    })
  );
}
