import  {Request,Response} from 'express'
import db from "../database/db";
import {withdrawalSchema,options} from '../utils/utils'
import bcrypt from 'bcryptjs'
const Flutterwave = require('flutterwave-node-v3');
import { banks } from '../utils/banks';

class WithdrawalController {
    async withdraw(req: Request, res: Response){
        try {
            let {userId} = req.params
            const validationResult = withdrawalSchema.validate(req.body, options);
            if (validationResult.error) {
              return res.status(400).json({ msg: validationResult.error.details[0].message });
            }
        
            const user = await db('users').where({id:userId}).first();
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
              return res.status(401).json({ msg: "Password should match 'password' on login" });
            }
        
            const wallet = user.wallet;
            const { number, amount,code } = req.body;
        
            if (wallet < amount) {
              return res.status(400).json({ msg: 'Insufficient funds' });
            }
            
            const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
            const details = {
              account_bank: "044" || code  ,
              account_number: "0690000040" || number  ,
              amount: amount,
              currency: "NGN",
              narration: "cash widthdrawal",
              //reference: `${uuidv4()}_PMCK`,
              callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
            };
        
            const payment = await flw.Transfer.initiate(details).then((data: any) => { return data }).catch(console.log);
            console.log(payment)
            if (payment.status === 'error') {
              return res.status(400).json({ msg: payment.message });
            } else {
              let info = {
                id: payment.data.id,
                code: payment.data.bank_code,
                bank: payment.data.bank_name,
                name: payment.data.full_name,
                accountNumber: payment.data.account_number,
                amount: payment.data.amount,
                status: payment.data.status,
                userId: user.id
              }
              await db('withdrawals').insert(info);
              const newWallet = wallet - amount;
              await db('users').where({id:userId}).update({wallet:newWallet});
              return res.status(201).json({ message: `You have successfully withdrawn N${amount} from your wallet`, info})
            }
            
            //return res.status(201).json({ msg: "Processing Withdrawal, Check 'Withdrawal History' to see status" });
          } catch (error) {
            console.error(error)
            res.status(500).json({ msg: 'Withdrawal failed: server error, Pls try again..'});
          }
    }

    async getAllWithdrawals(req:Request,res:Response) {
        try{
            const withdraw = await db('withdrawals')
            res.status(200).json({msg:"Retrieved Successfully",withdraw})
        }catch(err){
            console.log(err);
            res.status(500).json({msg:"failed to retrieve withdrawals"})
        }
    }
    async removeWithdrawal(req: Request, res: Response){
        try{
            const {id} = req.params;
    
            const deleteProduct = await db('withdrawals').where('id', id).delete();
    
            res.json({msg:"account deleted successfully",deleteProduct});
            }catch(err){
                res.status(500).json("unable to delete account")
            }
        }
       
}
export {WithdrawalController}
