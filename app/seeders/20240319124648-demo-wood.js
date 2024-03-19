'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Woods', [{
      name: 'Oak',
      type: 'noble and hardwoods',
      hardness: 'hard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pine',
      type: 'softwood',
      hardness: 'medium-hard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mahogany',
      type: 'exotic wood',
      hardness: 'hard',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Woods', null, {});
  }
};
