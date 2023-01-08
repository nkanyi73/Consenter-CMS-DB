"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, User }) {
      // define association here
      this.belongsTo(Category, { foreignKey: "category_id" });
      this.belongsTo(User, { foreignKey: "from" });
    }

    toJSON() {
      return { ...this.get() };
    }
  }
  Notification.init(
    {
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      from: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      to: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
    }
  );
  return Notification;
};
