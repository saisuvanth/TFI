import { Model, Sequelize, DataTypes } from "sequelize";


class User extends Model {
    public id!: string;
    public email!: string;
    public name!: string;
    public password!: string;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static initialize(sequelize: Sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUID,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: "user",
                name: {
                    singular: "user",
                    plural: "users"
                }
            })
    }
}

export default User;