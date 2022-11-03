import  {Request,Response} from 'express'
import db from "../database/db";
import {v4 as uuid} from 'uuid'
import {accountSchema,options, updateAccountSchema} from '../utils/utils'


class AccountController {
    async createAccount(req: Request, res: Response){
        try{
            const {userId} = req.params;
            const id = uuid();
            const validationResult = accountSchema.validate(req.body,options);
            if( validationResult.error){
            return res.status(400).json({
                Error:validationResult.error.details[0].message
            })
            }
            const bankCode ="044"
            const {bankName,accountName,accountNumber} = req.body;
            const duplicatAccountName =   await db('accounts').where({accountName:accountName}).first();
            const duplicatAccountNumber =   await db('accounts').where({accountNumber:accountNumber}).first();
            
            if(duplicatAccountNumber) return res.status(409).json({msg:"Account Number already exist"})
            const info =  {
                id,
                bankName,
                accountName,
                accountNumber,
                bankCode,
                userId,
                status:"inactive"
            }
            const record = await db('accounts').insert(
                info
             )
            res.status(200).json({msg:"Acount created successfully",info})
            

        }catch(err){
            console.log(err)
            res.status(500).json({msg:"fail to create account"})
        }
       
      
    }
    
    async getAccounts(req:Request,res:Response) {
        try{
           
           const account = await db('users');
           res.status(200).json({msg:"Acount Retrieved Successfully",account})
        }catch(err){
            console.log(err);
            res.status(500).json({msg:"failed to retrieve account"})
        }
    }

    async getUserAccounts(req:Request,res:Response) {
        try{
            const {userId} = req.params
           const account = await db('users as u')
            .join('accounts as a','u.id',"a.userId")
            .select(
                "u.id as userId","u.username","u.fullname","a.accountName","a.accountNumber","a.id"
            ).where({userId});
           res.status(200).json({msg:"Acount Retrieved Successfully",account})
        }catch(err){
            console.log(err);
            res.status(500).json({msg:"failed to retrieve account"})
        }
    }

   
    async updateAccount(req: Request, res: Response){

        try{
            const  {userId} = req.params
            const {id} = req.params
            const validationResult = updateAccountSchema.validate(req.body, options);
            if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
            }
            const {bankName} = req.body;
           
            const user = await db('accounts').where({userId}).first();
            if(!user){
                  return res.status(404).json({
                     Error:"Account not found",
                  })
            }
             
            const updatedAccount = await db('accounts').where({id}).andWhere({userId}).update({ bankName })
            const info = await db('accounts').where({id}).first()
            res.status(200).json({msg:"Account updated successfully",updatedAccount})

        }catch(err){
                res.status(500).json({msg:"Unable to Update account"})
        }
       
    }

    async removeAccount(req: Request, res: Response){
        try{
            const {id} = req.params;
    
            const deleteProduct = await db('accounts').where('id', id).delete();
    
            res.json(deleteProduct);
            }catch(err){
                res.status(500).json("unable to delete account")
            }
        }
       
}

export { AccountController }