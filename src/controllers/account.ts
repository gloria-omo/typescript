import Account from "../models/accounts";
import { Request,Response } from "express";
import User from "../models/user"

export const createAccount = async(req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        
    } catch (error) {
        res.status(500).json({
            message:"intenal server error",
            data: error.message
        })
        
    }
}