import { Snowflake } from "@theinternetfolks/snowflake";
import { Community, Member, Role, User } from "../models";

export const addMember = async (data: AddMember) => {
    const { community, user, role, owner } = data;
    const comm = await Community.findByPk(community, { include: ['user'] });
    if (!community) {
        throw new Error("Community not found");
    }
    if ((comm as any)?.owner !== owner) {
        throw new Error("Only the owner can add members");
    }
    const userToAdd = await User.findByPk(user);
    if (!userToAdd) {
        throw new Error("User not found");
    }

    const roleToAdd = await Role.findByPk(role);
    if (!roleToAdd) {
        throw new Error("Role not found");
    }

    const member = await Member.create({
        id: Snowflake.generate().toString(),
        userId: user,
        communityId: community,
        roleId: role
    });

    return member.toJSON();
}


export const removeMember = async (id: string) => {
    const member = await Member.findByPk(id);
    if (!member) {
        throw new Error("Member not found");
    }
    await member.destroy();
    return member.toJSON();
}