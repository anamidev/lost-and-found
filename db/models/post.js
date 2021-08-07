'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'categoryId'});
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.Claim, { foreignKey: 'postId' });
    }
  }
  Post.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
