export default {
  up: (queryInterface) => queryInterface.bulkInsert('trailers', [
    {
      videoId: 'fr477dft7w3-4f378i-kk21-0878-c0f364dfrty9de1',
      trailerLink: '14acd40f-54e6-4d41fg-88a1-2efbdf49dfgcac59.mp4',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      videoId: 'fr474rtt7w3-4f378i-kk21-0878-c0f364dfrty9de1',
      trailerLink: '14acd40f-54e6-4d41fg-88a1-2efbdf49dfgcac59.mp4',
      updatedAt: new Date(),
      createdAt: new Date(),
    }

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('trailers', null, {}),
};
