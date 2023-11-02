"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
console.log(process.env);
const region = (0, core_1.getInput)("region", {
    required: true,
    trimWhitespace: true,
});
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
// const client = new SNSClient({
//   credentials: fromEnv(),
//   region,
// });
const structure = (_a = (0, core_1.getInput)("structure", {
    required: true,
})) !== null && _a !== void 0 ? _a : "json";
// publishMessage(topic, message, structure, subject)
//   .then((response) => {
//     setOutput("message_id", response.MessageId);
//   })
//   .catch((e) => {
//     setFailed(e);
//   });
// function publishMessage(
//   topic: string,
//   message: string,
//   structure: string,
//   subject?: string
// ): Promise<PublishCommandOutput> {
//   return client.send(
//     new PublishCommand({
//       TopicArn: topic,
//       Subject: subject,
//       Message: message,
//       MessageStructure: structure,
//     })
//   );
// }
