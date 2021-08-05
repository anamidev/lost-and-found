'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      // this.belongsTo(models.Claim, { foreignKey: 'messageId' });
      this.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  Message.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: DataTypes.TEXT,
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
