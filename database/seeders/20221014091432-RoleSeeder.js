"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          role_name: "Institution",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_name: "Subject",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_name: "Third Party",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
