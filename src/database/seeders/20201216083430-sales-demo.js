export default {
  up: (queryInterface) => queryInterface.bulkInsert('sales', [
    {
      id: 1,
      method: 'spenn',
      transactionId: '0433e6b6-2eeb-47eb-a307-eec0771a6fa4',
      plan: "Promo",
      amount: 0.9,
      creationTime: 1607957486592,
      user: 'jewv91hm@temporary-mail.net',
      monthYear: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      method: 'spenn',
      transactionId: 'b3e10ed2-1fc6-4d99-90c2-fb41805b1e02',
      plan: "Promo",
      amount: 0.9,
      creationTime: 1608017203744,
      user: 'hwj0lbiu@temporary-mail.net',
      monthYear: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      method: 'spenn',
      transactionId: '94264778-6a96-4cda-a110-f288a53acfc4',
      plan: "Promo",
      amount: 3.6,
      creationTime: 1608018303493,
      user: 'ok6ja_6x@temporary-mail.net',
      monthYear: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    }

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('sales', null, {}),
};


