module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'crNumber', {
    type: Sequelize.STRING,
    allowNull: true
  }).then(() => queryInterface.addColumn('Users', 'crCVC', {
    type: Sequelize.STRING,
    allowNull: true
  })).then(() => queryInterface.addColumn('Users', 'cardFirstName', {
    type: Sequelize.STRING,
    allowNull: true
  })).then(() => queryInterface.addColumn('Users', 'expMonth', {
    type: Sequelize.STRING,
    allowNull: true
  }))
    .then(() => queryInterface.addColumn('Users', 'expYear', {
      type: Sequelize.STRING,
      allowNull: true
    }))
    .then(() => queryInterface.addColumn('Users', 'cardLastName', {
      type: Sequelize.STRING,
      allowNull: true
    })),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'crNumber')
    .then(() => queryInterface.removeColumn('Users', 'crCVC'))
    .then(() => queryInterface.removeColumn('Users', 'cardFirstName'))
    .then(() => queryInterface.removeColumn('Users', 'expMonth'))
    .then(() => queryInterface.removeColumn('Users', 'expYear'))
};
