const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define the Customer model
const Customer = sequelize.define('Customer', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Customer;
