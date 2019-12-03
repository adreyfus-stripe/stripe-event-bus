const AWS = require("aws-sdk");
const { promisify } = require("util");

const eventbridge = new AWS.EventBridge();
eventbridge.shipIt = promisify(eventbridge.putEvents);

module.exports = {
  handler: async (event, context, callback) => {
    try {
      const { id, type } = JSON.parse(event.body);

      console.log(
        `Sending event ${id} of type ${type} to ${process.env.EVENT_BUS_NAME} event bus via AWS EventBridge`
      );
      const params = {
        Entries: [
          {
            Detail: event.body,
            DetailType: type,
            EventBusName: process.env.EVENT_BUS_NAME, //Event Bus name,
            Resources: [],
            Source: "Stripe",
            Time: new Date()
          }
        ]
      };

      const result = await eventbridge.shipIt(params);
      callback(null, {});
    } catch (e) {
      console.log("Alas, an error", e);
    }
  }
};
