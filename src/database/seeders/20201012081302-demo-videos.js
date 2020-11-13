export default {
  up: (queryInterface) => queryInterface.bulkInsert('videos', [
    {
      id: 13,
      videoLink: '14acd40f-54e6-4d41-88a1-2efb49ecac58.mp4',
      videoId: 'b467da83-4f0d-4421-8818-c0f364ca9de1',
      videoName: "A Midwife's Oath",
      videoCast: 'basmah ,reyhab , rasha',
      videoSynopsis: ' a women who have given an oath to help women deliver their babies safely, even in times of conflict in Azraq Refugee Camp, Jordan',
      videoWatchCount: 0,
      videoThumbnailLink: '7627487f-9587-4036-be54-62721b5b5328.jpg',
      videoIdVimeo: '0000',
      videoClientId: '67b6c3a8-884f-48af-8e8f-1a60b15824de',
      rate: '1599144054255',
      isFeatured: false,
      category: 'Documentary',
      type: 'movie',
      featureType: 0,
      resCountries: 'Uganda, Kenya',
      videoSuspensionState: false,
      nameTagThumbNailLink: '742bfa3b-1b94-418e-a584-82ce251103ce.jpg',
      tallThumbNailLink: '6bbdb89d-2455-4440-b9ea-7ba412f9c914.png',
      updatedAt: new Date(),
      createdAt: new Date(),

    }

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('videos', null, {}),
};
