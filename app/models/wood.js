'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wood.init({
    name: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('softwood', 'exotic wood', 'noble and hardwoods'),
      allowNull: false,
    },
    hardness: {
      type: DataTypes.ENUM('tender', 'medium-hard', 'hard'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Wood',
    timestamps: true
  });
  return Wood;
};