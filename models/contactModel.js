const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING, 
    allowNull: true 
  }
});

// Un contacto pertenece a un usuario
Contact.belongsTo(User, { foreignKey: 'userId' });

module.exports = Contact;
