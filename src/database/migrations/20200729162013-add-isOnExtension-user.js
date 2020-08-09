export function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('Users', 'isOnExtension', { type: Sequelize.BOOLEAN });
}
export function down(queryInterface) {
  return queryInterface.removeColumn('Users', 'isOnExtension');
}
