import { Snowflake } from "@theinternetfolks/snowflake";
import { Community, Member, User } from "../models";
import { addRole } from "./roleController";
import { addMember } from "./memberController";

export const createCommunity = async (data: CreateCommunity) => {
    const { name, ownerId } = data;
    const comm = await Community.create({
        id: Snowflake.generate().toString(),
        name,
        slug: name.toLowerCase().replace(/\s/g, '-'),
        owner: ownerId
    });
    const role = await addRole(`${comm.name} Admin`);
    await addMember({ community: comm.id, user: ownerId, role: role.id, owner: ownerId })
    return comm.toJSON();
}

export const getCommunities = () => {
    return Community.findAll({
        include: ['user']
    });
}

export const getCommunityMembers = (id: string) => {
    return Community.findOne({
        where: {
            id
        },
        include: [{
            model: Member,
            as: 'communityMembers',
            include: [{
                model: User,
                as: 'user'
            }]
        }]
    })
}

export const getOwnedCommunities = (owner: string) => {
    return Community.findAll({
        where: {
            owner: owner
        }
    })
}

export const getJoinedCommunities = (user: string) => {
    return Member.findAll({
        where: {
            userId: user
        },
        include: [{
            model: Community,
            as: 'community',
            include: [{
                model: User,
                as: 'user'
            }]
        }]
    })
}