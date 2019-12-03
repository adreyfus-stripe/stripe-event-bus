const AWS = require("aws-sdk");
const { promisify } = require("util");

const eventbridge = new AWS.EventBridge();
eventbridge.shipIt = promisify(eventbridge.putEvents);

module.exports = {
  handler: async () => {
    console.log(`Hi I am in this function`);
  }
};
