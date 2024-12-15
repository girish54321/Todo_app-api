'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Todos', {
      toDoId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title cannot be empty.',
          },
        },
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Body cannot be empty.',
          },
        },
      },
      state: {
        type: Sequelize.ENUM('pending', 'completed', 'in-progress'),
        defaultValue: 'pending',
        allowNull: false,
        validate: {
          isIn: [['pending', 'completed', 'in-progress']],
          notEmpty: {
            msg: 'State must be either pending or completed.',
          },
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // The table name of the referenced model
          key: 'userId',  // The column in the Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Todos');
  },
};
