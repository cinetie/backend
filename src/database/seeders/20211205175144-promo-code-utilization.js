export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert("PromoCodeUtilizations", [
      {
        id: 300,
        ambassadorEmail: "ambassador@example.com",
        userEmail: "user@example.com",
        plan: "Premium_discount",
        status: 'pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 301,
        ambassadorEmail: "ambassador4@example.com",
        userEmail: "user@example.com",
        plan: "Premium_discount",
        status: 'pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 302,
        ambassadorEmail: "ambassador4@example.com",
        userEmail: "user2@example.com",
        plan: "Premium_discount",
        status: 'pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 303,
        ambassadorEmail: "ambassador4@example.com",
        userEmail: "user3@example.com",
        plan: "Premium_discount",
        status: 'pending',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("PromoCodeUtilizations", null, {}),
};
