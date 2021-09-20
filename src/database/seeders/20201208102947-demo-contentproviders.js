export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert("contentProviders", [
      {
        clientId: "31978540-8bdf-41cc-81d7-26200b847c0a",
        name: "user first",
        email: "user1@example.com",
        password:
          "$2b$10$e4mDUxqPFvW5boZpmPdNYOoWWTnNLOpDnpAorm5f45wAP2rjjfYA.",
        nationality: "Rwandan",
        cityOfResidence: "Muhima",
        isVerified: true,
        phoneLine: "+240799887212",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]),
  down: (queryInterface) =>
    queryInterface.bulkDelete("contentProviders", null, {}),
};
