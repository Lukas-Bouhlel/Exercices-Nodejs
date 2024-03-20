'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@mail.com',
      password: bcrypt.hashSync('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@mail.com',
      password: bcrypt.hashSync('password123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@mail.com',
      password: bcrypt.hashSync('securepassword', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
