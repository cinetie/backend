export function up(queryInterface, Sequelize) {
  return queryInterface.removeColumn("contentProviders", "idLink");
}
export function down(queryInterface, Sequelize) {
  return queryInterface.addColumn(
    "contentProviders",
    "idLink",
    Sequelize.STRING
  );
}
