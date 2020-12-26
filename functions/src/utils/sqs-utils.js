const aws = require("aws-sdk");
const config = require("../../config/keys");

aws.config.update({
  region: "ap-south-1",
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.secretAccessKey,
});

const sqs = new aws.SQS({ apiVersion: "2012-11-05" });

exports.sendMessageToUserProfileQueue = (message) => {
  return new Promise((resolve, reject) => {
    const params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: `https://sqs.ap-south-1.amazonaws.com/${config.awsAccountNumber}/${config.userProfileQueueName}`,
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.MessageId);
      }
    });
  });
};
