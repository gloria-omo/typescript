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
console.log(process.env.JWT_SECRET)
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
           process.env.JWT_SECRET, { expiresIn: "1 day" })
           

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

export const logout = async (req:Request, res:Response) => {
    try {
        const authorizationHeader = req.headers.authorization;
// i commented the log out intentionally

        if (!authorizationHeader) {
            return res.status(400).json({ error: 'Authorization token not found' });
        }

        const token = authorizationHeader.split(' ')[1];
//         if (!authorizationHeader) {
//             return res.status(400).json({ error: 'Authorization token not found' });
//         }

        if (!token) {
            return res.status(400).json({ error: 'Authorization token not found' });
        }
//         const token = authorizationHeader.split(' ')[1];

        // Verify and decode the token to get user ID
        const decodedToken: any = jwt.verify(token, process.env.jwtSecret);

        if (!decodedToken) {
            return res.status(400).json({ error: 'Invalid token' });
        }
//         const decodedToken: any = jwt.verify(token, process.env.jwtSecret);

        // Find user by decoded user ID
        const user = await User.findByPk(decodedToken.userId);
//         if (!decodedToken) {
//             return res.status(400).json({ error: 'Invalid token' });
//         }

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
//         // Find user by decoded user ID
//         const user = await User.findByPk(decodedToken.userId);

        // Invalidate token by setting it to null
        user.token = null;
        await user.save();
//         if (!user) {
//             return res.status(400).json({ error: 'User not found' });
//         }

        // Send success response
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};