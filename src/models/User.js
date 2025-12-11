import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_info: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('member', 'admin'),
      allowNull: false,
      defaultValue: 'member',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;
