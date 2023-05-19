'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports', {
      fields : [ 'cityId' ],
      type : 'foreign key' ,
      name : 'city_fkey_constraint',
      references: {
        table : 'Cities',
        field : 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint('Airports', 'city_fkey_constraint');
  }

  // query to check if constraint has been applied or not
  // select * from Information_schema.key_column_usage where table_name = 'airports' and constraint_schema='flights'
};
