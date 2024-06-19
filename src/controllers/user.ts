import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, comfirmPassword, phoneNumber } = req.body;
        const user = await User.findOne({ where: {email}});
    
        if (user) {
            res.status(400).json({
                message: "User already exist"
            })
        }

        if (password !== comfirmPassword) {
            res.status(401).json({
                message: "password does not match"
            })
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            comfirmPassword: hashPassword,
            phoneNumber
        })

        res.status(200).json({
            message: "User successfully created",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            data: error.message
        })
    }
}