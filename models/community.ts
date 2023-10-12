import { Association, BelongsToCreateAssociationMixin, BelongsToSetAssociationMixin, DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";


class Community extends Model {
    public id!: string;
    public name!: string;
    public slug!: string;


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
            },
            slug: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            }
        },
            {
                sequelize,
                tableName: "community",
                name: {
                    singular: "community",
                    plural: "communities"
                }
            })
    }


}

export default Community;