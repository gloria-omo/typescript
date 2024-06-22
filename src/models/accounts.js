'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  accounts.init({
    user_id: DataTypes.INTEGER,
    accountNumber: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    accountType: DataTypes.ENUM,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};