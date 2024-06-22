

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = await queryInterface.sequelize.query(
      'SELECT id FROM users;', 
      { type: Sequelize.QueryTypes.SELECT }
    );

    const usersIds = usersData.map(user => user.id);

    return queryInterface.bulkInsert('accounts', [
      {
        user_id: 2, 
        accountNumber: 123456,
        balance: 6679,
        accountType: 'savings',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1, 
        accountNumber: 789012,
        balance: 5989,
        accountType: 'current',
        status: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
