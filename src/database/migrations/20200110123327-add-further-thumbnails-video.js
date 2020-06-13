module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('videos', 'tallThumbNailLink', {
    type: Sequelize.STRING,
    null: true
  }).then(() => queryInterface.addColumn('videos', 'nameTagThumbNailLink', {
    type: Sequelize.STRING,
    null: true
  })),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('videos', 'tallThumbNailLink')
    .then(() => queryInterface.removeColumn('videos', 'nameTagThumbNailLink'))
};
