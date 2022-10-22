'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      home_team: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      home_team_goals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      away_team_goals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      in_progess: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
