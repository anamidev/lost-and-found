'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId' });
      this.hasMany(models.Message, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
