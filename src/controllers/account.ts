import Account from "../models/accounts";
import { Request,Response } from "express";
import User from "../models/user"

export const createAccount = async(req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const {accountNumber,balance,user_id,accountType} = req.body;
        const user = await User.findByPk(id);
        if(!user){
          return res.status(400).json({
            message:"can not create an account: Must be a user"
          })
        }
       
        const userAccount = await Account.create({
            accountType,
            balance,
            user_id:user.id,
            accountNumber:Math.random()*11

    })
        if (balance === "00") {
        
            
        }

        
    } catch (error) {
        res.status(500).json({
            message:"intenal server error",
            data: error.message
        })
        
    }
}