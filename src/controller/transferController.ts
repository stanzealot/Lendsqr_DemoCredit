import  {Request,Response} from 'express'
import db from "../database/db";
import {v4 as uuid} from 'uuid'
import {transferSchema,options} from '../utils/utils'


class TransferController {
    async transfer(req: Request, res: Response){
        try{
                const {userId} = req.params;
                const id = uuid();
                const validationResult = transferSchema.validate(req.body,options);
                if( validationResult.error){
                    return res.status(400).json({
                    Error:validationResult.error.details[0].message
                    })
                }
                const {amount,recipient,recipientEmail,recipientPhone} = req.body;
                const sender = await db('users').where({id:userId}).first();
                const receiver = await db('users').where({email:recipientEmail}).first();
                const {phonenumber} = receiver
                let {wallet} = sender
                let receiverWallet = receiver.wallet
                let senderBalance = wallet - amount
                let receiverBalance = receiverWallet + amount
                if(recipientPhone === sender.phonenumber || recipientEmail ===sender.email ) return res.status(403).json({msg:"cannot transfer to self"})
                if(senderBalance < 10) return res.status(409).json({msg:"insufficient fund; balance must be above 10 Naira"})
                if(!receiver) return res.status(409).json({msg:"Invalid users details"})
                if(phonenumber !== recipientPhone) return res.status(409).json({msg:"Invalid users details"})
                
                const info =  {id,amount,userId,recipient,recipientEmail,recipientPhone,status:"pending"}
                await db('transfers').insert(info)
                await db('users').where({id:userId}).update({wallet:senderBalance})
                await db('users').where({email:recipientEmail}).update({wallet:receiverBalance})
                    res.status(200).json({msg:"tansfer was Successful",info})
                        
                }catch(err){
                        console.log(err)
                        res.status(500).json({msg:"fail to deposit"})
                }
                    
    }
    
    async getAllTransfer(req:Request,res:Response) {
        try{
            const account = await db('transfers')
            
            res.status(200).json({msg:"Acount Retrieved Successfully",account})
        }catch(err){
            console.log(err);
            res.status(500).json({msg:"failed to retrieve account"})
        }
    }

    async getUserTransfer(req:Request,res:Response) {
        try{
            const {userId} = req.params
           const deposit = await db('users as u')
            .join('transfers as t','u.id',"t.userId")
            .select(
                "u.id as userId","t.recipientEmail","t.amount","t.status"
            ).where({userId});
           res.status(200).json({msg:"Deposit Retrieved Successfully",deposit})
        }catch(err){
            console.log(err);
            res.status(500).json({msg:"failed to retrieve account"})
        }
    }

    async removeTransfer(req: Request, res: Response){
        try{
            const {id} = req.params;
    
            const deleteProduct = await db('transfers').where('id', id).delete();
    
            res.json({msg:"account deleted successfully",deleteProduct});
            }catch(err){
                res.status(500).json("unable to delete account")
            }
        }
       
}

export {TransferController}

