export function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('videos', 'rate', { type: Sequelize.STRING });
}
export function down(queryInterface) {
  return queryInterface.removeColumn('videos', 'rate');
}
