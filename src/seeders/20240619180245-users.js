module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        password: 'gloria12345',
        comfirmPassword: 'gloria12345',
        phoneNumber: '08038469064',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'izik',
        lastName: 'Doe',
        email: 'example2@example.com',
        password: 'gloria1234',
        comfirmPassword: 'gloria1234',
        phoneNumber: '08038469065',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};