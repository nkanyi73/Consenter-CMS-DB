"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     **/
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: uuidv4(),
          username: "jdoe",
          role_id: 1,
          email: "jdoe@email.com",
          password: "123456",
          walletAddress: "0xHUIUIHKERXR556CC",
          contractAddress: "0xHHHSAYYWOOE75S",
          affiliation: "0xHJJKSA45SH4SSA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          username: "janedoe",
          role_id: 2,
          email: "janedoe@email.com",
          password: "123456",
          walletAddress: "0xKLAHDHAIUWBIODHA76",
          contractAddress: "0xAJKDHKALJHUIUHIW12",
          affiliation: "0xJKAHDJKHFHAUI9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          username: "kevindoe",
          role_id: 3,
          email: "kevindoe@email.com",
          password: "123456",
          walletAddress: "0xJ",
          contractAddress: "0xHHHSAYYWOOE75S",
          affiliation: "0xHJJKSA45SH4SSA",
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
