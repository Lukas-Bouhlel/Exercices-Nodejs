'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@mail.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@mail.com',
      password: 'securepassword',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
