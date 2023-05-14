'use strict';

const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('airplanes',[
      {
        'modelNumber': 'airbus390',
        'capacity': '200',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        'modelNumber': 'airbus321neo',
        'capacity': '200',
        createdAt : new Date(),
        updatedAt: new Date()
      }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    //If we keep the object plain empty then all entries will be deleted

    await queryInterface.bulkDelete('airplanes', {[Op.or] : [
      {'modelNumber':'airbus380'},
      {'modelNumber': 'airbus320neo'}
    ]});
  }
};
