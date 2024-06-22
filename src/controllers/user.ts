import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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

export const login =async(req:Request,res:Response)=>{
    try {
        const{email,password} = req.body;
        if (!email) {
            return res.status(400).json({
                message: 'Please enter Email address'
            })
        }

        // Find user based on email or Phone Number
        const user = await User.findOne({ where: {email}});

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Compare user's password with the saved password.
        const checkPassword = bcrypt.compareSync(password, user.password)
        // Check for password error
        if (!checkPassword) {
            return res.status(400).json({
                message: 'Invalid password'
            })
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        },
           "process.env.JWT_SECRET", { expiresIn: "1 day" })

        // Save the user data to the database
        user.save()
        // Send a success response
        res.status(200).json({
            message: 'Login successful',
            user,
            token
        })

        
    } catch (error) {
        res.status(500).json({
            message:"unable to sign up",
            data:error.message
        })

        
    }
}

export const getAll = async(req:Request , res:Response)=>{
    try {
        const user = await User.findAll();
        if(user.length === 0)
        return res.status(400).json({
             message:"no user found"
        })
        
           res.status(200).json({
            message: "here are all your users",
            data: user
           })

    } catch (error) {
        res.status(500).json({
            message:"unable to get all",
            data: error.message
        })
        
    }
};

export const getOne = async (req:Request , res:Response)=>{
    try {
        const {email} =req.body
        const user = await User.findOne({where:{email}});
        res.status(200).json({
            message: "the user",
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message:"unable to get one user",
            data:error.message
        })
        
    }
}

export const getById = async (req:Request , res:Response)=>{
    try {
        const {id} = req.params
        const user = await User.findByPk(id);
        res.status(200).json({
            message: "the user",
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message:"unable to get one user",
            data:error.message
        })
        
    }
}