'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: 'postId' });
      this.belongsTo(models.Message, { foreignKey: 'messageId' });
    }
  };
  Claim.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Claim',
  });
  return Claim;
};
