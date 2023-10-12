import { Snowflake } from "@theinternetfolks/snowflake"
import { Community, Role } from "../models"

export const addRole = async (name: string) => {
    const role = await Role.create({
        id: Snowflake.generate().toString(),
        name
    })
    return role.toJSON();
}

export const getRoles = () => {
    return Role.findAll();
}