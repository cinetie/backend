export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert("plans", [
      {
        id: 245,
        type: "Promo",
        hasHd: true,
        hasUltraHd: true,
        numberOfScreens: 300,
        monthlyPrice: 3,
        yearlyPrice: 12,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 246,
        type: "setup",
        hasHd: true,
        hasUltraHd: true,
        numberOfScreens: 300,
        monthlyPrice: 0,
        yearlyPrice: 0,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("plans", null, {}),
};
