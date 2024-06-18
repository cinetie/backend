"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = down;
exports.up = up;
function up(queryInterface, Sequelize) {
  return queryInterface.removeColumn("contentProviders", "idLink");
}
function down(queryInterface, Sequelize) {
  return queryInterface.addColumn("contentProviders", "idLink", Sequelize.STRING);
}