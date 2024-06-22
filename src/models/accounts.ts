import { DataTypes, Model } from 'sequelize';
import sequelize from '../configuration/config';

class Account extends Model {
  public id!: number;
  public user_id!: number;
  public accountNumber!: number;
  public accountType!: 'savings' | 'current' | 'fixedDeposit';
  public status!: 'active' | 'inactive';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    accountType: {
      type: DataTypes.ENUM('savings', 'current', 'fixedDeposit'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
    }
  },
  {
    timestamps: true,
    tableName: 'accounts',
    sequelize,
  }
);

export default Account;

