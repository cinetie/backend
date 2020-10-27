export default {
  up: (queryInterface) => queryInterface.bulkInsert('subscriptions', [
    {
      id: 0,
      email: 'blaise1@gmail.com',
      plan: "Promo",
      price: 3,
      endDate: "DataTypes.STRING",
      dueState: false,
      paymentMethod: 1,
      state: 'current',
      phoneNumber: '+250788726152',
      trialEnds: 10000,
      updatedAt: new Date(),
      createdAt: new Date(),
    }

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('subscriptions', null, {}),
};
