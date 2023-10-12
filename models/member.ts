import { Association, BelongsToCreateAssociationMixin, BelongsToSetAssociationMixin, DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";
import Role from "./role";
import Community from "./community";

class Member extends Model {
    public id!: string;


    public readonly createdAt!: Date;


    public static initialize(sequelize: Sequelize) {
        this.init({
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUID,
                primaryKey: true
            }
        },
            {
                sequelize,
                tableName: "member",
                name: {
                    singular: "member",
                    plural: "members"
                }
            })
    }
}

export default Member;