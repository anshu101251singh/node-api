const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('customer', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  connectToDatabase,
};
