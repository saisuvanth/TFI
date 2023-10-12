import { User } from "../models";
import { compare, genSalt, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { Snowflake } from '@theinternetfolks/snowflake';

export const userSignup = async (data: UserSignup) => {
    const { email, name, password } = data;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return User.create({
        id: Snowflake.generate().toString(),
        email,
        name,
        password: hashedPassword
    })
}

export const userLogin = async (data: UserLogin) => {
    const { email, password } = data;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }
    const token = sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return { token, name: user.name };
}