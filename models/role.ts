import { DataTypes, Model, Sequelize } from "sequelize";


class Role extends Model {
    public id!: string;
    public name!: string;
    public scopes!: string[];


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUID,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            scopes: {
                type: DataTypes.STRING(100),
                allowNull: true
            }
        },
            {
                sequelize,
                tableName: "role",
                name: {
                    singular: "role",
                    plural: "roles"
                }
            })
    }
}

export default Role