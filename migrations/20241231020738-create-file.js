'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      fileId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      fileName: {
        type: Sequelize.STRING
      },
      fileSize: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users', // The table name of the referenced model
          key: 'userId',  // The column in the Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      toDoId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Todos', // The table name of the referenced model
          key: 'toDoId',  // The column in the Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};