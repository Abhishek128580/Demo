const { DataTypes } = require('sequelize');

// This now exports a function
module.exports = (sequelize) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: false
  });

  return Role;
};