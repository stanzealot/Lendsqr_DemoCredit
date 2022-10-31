import  {Request,Response} from 'express'
import db from "../database/db";
import {v4 as uuid} from 'uuid'
import {depositSchema,options} from '../utils/utils'


class DepositController {
    async deposit(req: Request, res: Response){
        try{
                const {userId} = req.params;
                const id = uuid();
                const validationResult = depositSchema.validate(req.body,options);
                if( validationResult.error){
                    return res.status(400).json({
                    Error:validationResult.error.details[0].message
                    })
                }
                const {amount} = req.body;
                const info =  {id,amount,userId,status:"pending"}
                await db('deposits').insert(info)
                await db('users').where({id:userId}).update({wallet:amount})
                    res.status(200).json({msg:"Request received, your account will be credited after confirmation",info})
                        
                }catch(err){
                        console.log(err)
                        res.status(500).json({msg:"fail to deposit"})
                }
                    
    }
    
    async getAllDeposits(req:Request,res:Response) {
        try{
            const account = await db('deposits as d')
            .join('users as u','d.userId','u.id')
            .select(
                'u.username','u.id as user_id','d.amount','d.status','d.id as transaction_id'
            );
            res.status(200).json({msg:"Acount Retrieved Successfully",account})
        }catch(err){
            console.log(err);
            res.status(500).json({msg:"failed to retrieve account"})
        }
    }

    async getUserDeposit(req:Request,res:Response) {
        try{
            const {userId} = req.params
           const deposit = await db('users as u')
            .join('deposits as d','u.id',"d.userId")
            .select(
                "u.id as userId","u.username","u.fullname","d.amount","d.status","d.id"
            ).where({userId});
           res.status(200).json({msg:"Deposit Retrieved Successfully",deposit})
        }catch(err){
            console.log(err);
            res.status(500).json({msg:"failed to retrieve account"})
        }
    }

    async removeDeposit(req: Request, res: Response){
        try{
            const {id} = req.params;
    
            const deleteProduct = await db('deposits').where('id', id).delete();
    
            res.json(deleteProduct);
            }catch(err){
                res.status(500).json("unable to delete account")
            }
        }
       
}

export {DepositController}

