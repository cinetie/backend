export default {
  up: (queryInterface) => queryInterface.bulkInsert('plans', [
    {
      id: 0,
      type: 'Promo',
      hasHd: true,
      hasUltraHd: true,
      numberOfScreens: 2,
      monthlyPrice: 3,
      yearlyPrice: 12,
      updatedAt: new Date(),
      createdAt: new Date(),
    }

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('plans', null, {}),
};
