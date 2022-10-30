import express,{Request,Response} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import accountRouter from './routes/account'
import usersRouter from './routes/users'
import DB from './database/knex'
import {knex} from './database/knex'
import {v4 as uuid} from 'uuid'

const app = express();

DB().then(()=> console.log('database Connected successfully'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/democredit', accountRouter);
app.use('/users', usersRouter);

app.post('/create',async(req:Request,res:Response)=>{
    try{
        let id = uuid()
        const {username,fullname,password,phonenumber,email} = req.body;
        const user =  {
            id,
            username,
            fullname,
            password,
            phonenumber,
            email,
            wallet:0.0

        }
        const record = await knex('users').insert(user)
        res.status(201).json({msg:"created successfully",record})
    }catch(err){
        console.log(err)
    }
})
app.post('/account',async(req:Request,res:Response)=>{
    try{
        let id = uuid()
        let userId = uuid()
        const bankCode ="123"
        const {bankName,accountName,accountNumber} = req.body;
        const info =  {
            id,
            bankName, 
            accountName,
            accountNumber,
            bankCode,
            status:"pending",
            userId
        }
        const record = await knex('account').insert(info)
            res.status(200).json({msg:"Acount created successfully",info})
    }catch(err){
        console.log(err)
    }
})
export default app;
