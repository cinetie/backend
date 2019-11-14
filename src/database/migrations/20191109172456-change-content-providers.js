'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.addColumn('contentProviders','password',Sequelize.STRING)
    .then(()=>{
      return  queryInterface.addColumn('contentProviders','isVerified',Sequelize.BOOLEAN)
    })
    .then(()=>{
      return queryInterface.addColumn('contentProviders','permissionLevel')
    })
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('contentProviders','password')
    .then(()=>{
      return queryInterface.removeColumn('contentProviders','isVerified')
    })
  }
};
