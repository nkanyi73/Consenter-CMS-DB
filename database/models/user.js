"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Notification, Role }) {
      // define association here
      this.belongsTo(Role, { foreignKey: "role_id" });
      this.hasMany(Notification, {foreignKey: "from"})
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      walletAddress: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      contractAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      affiliation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  User.removeAttribute("id");
  return User;
};
