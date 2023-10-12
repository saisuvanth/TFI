import { Sequelize } from "sequelize";
import User from "./user";
import Community from "./community";
import Role from "./role";
import Member from "./member";


const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: parseInt(process.env.DB_PORT as string)
    }
)

let models = [User, Community, Role, Member];

models.forEach(model => {
    model.initialize(sequelize);
});

Community.belongsTo(User, { foreignKey: "owner" });
User.hasMany(Community, { foreignKey: "owner", as: "ownedCommunities" });


Member.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Member, { foreignKey: "userId", as: "userMembers" });

Member.belongsTo(Community, { foreignKey: "communityId" });
Community.hasMany(Member, { foreignKey: 'communityId', as: "communityMembers" });

Member.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(Member, { foreignKey: "roleId", as: "roleMembers" });


// User.belongsToMany(Community, { through: Member });
// Role.belongsToMany(Member, { through: 'CommunityRole' });
// Member.belongsToMany(Role, { through: "CommunityRole" });
// User.belongsToMany(Role, { through: Member, as: "user", });

// Role.belongsToMany(User, { through: Member, as: "role" });

sequelize.sync()

export {
    sequelize as Db,
    User, Community, Member, Role
}
