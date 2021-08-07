'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Личные вещи',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Электроника',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Документы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Животные',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Другое',
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
    {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
