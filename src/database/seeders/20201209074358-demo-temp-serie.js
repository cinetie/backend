export default {
  up: (queryInterface) => queryInterface.bulkInsert('tempSeries', [
    {
      id: 156,
      videoId: 'b467da83-4f0d-4421-8818-c0f364cty9de1',
      uri: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmkiOiJocmZlaGJoZWJnaHJndC5tcDQiLCJpZCI6MTM3LCJpYXQiOjE2MDc1MDExMzZ9.S7G-w6gymzmmTJtAuES4AuIQBiZN8rlF6AhGqdZTQr4',
      size: null,
      updatedAt: new Date(),
      createdAt: new Date(),

    },
    {
      id: 157,
      videoId: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh',
      uri: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmkiOiJocmZlaGJoZWJnaHJndC5tcDQiLCJpZCI6MTM3LCJpYXQiOjE2MDgyOTg3MDR9.W5IUaUwrXSdswKLeAfkBFezE4kQGH6du0Hd2eCihY9A',
      size: null,
      updatedAt: new Date(),
      createdAt: new Date(),

    },
    {
      id: 158,
      videoId: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh',
      uri: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmkiOiJocmZlaGJoZTg5Z2hyZ3QubXA0IiwiaWQiOjEzOCwiaWF0IjoxNjA4MzAxNTU5fQ.CJS8ONQOvy1IWvDgVp8VfBsky99dKfNhyUru6fm45DU',
      size: null,
      updatedAt: new Date(),
      createdAt: new Date(),

    },
    {
      id: 159,
      videoId: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh',
      uri: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmkiOiJocmZlaGJoZTg5Z2hyZ3QubXA0IiwiaWQiOjEzOSwiaWF0IjoxNjA4MzAyNDU4fQ.JfUbO6EAFL0RrYrIGvyDc9arMA-QymgCVBIc0w30O0U',
      size: null,
      updatedAt: new Date(),
      createdAt: new Date(),

    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('tempSeries', null, {}),
};
