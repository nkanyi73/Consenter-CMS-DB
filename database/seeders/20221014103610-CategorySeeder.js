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
      "categories",
      [
        {
          name: "Personal Information",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Education Information",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Contact Information",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Financial Information",
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
