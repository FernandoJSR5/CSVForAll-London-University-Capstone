Meteor.startup(function() {
  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: "XXXXXXX",
        client_email: "XXXXXXX",
        secret: "XXXXXXX"
      }
    },
    { upsert: true }
  );
});
