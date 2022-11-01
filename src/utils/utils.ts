import Joi from 'joi'
import jwt from 'jsonwebtoken'

export const updateUserSchema = Joi.object().keys({
    username:Joi.string(),
    fullname:Joi.string(),
    phonenumber:Joi.string(),
    email:Joi.string().trim().lowercase(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)

});

export const registerSchema = Joi.object().keys({
    username:Joi.string().required(),
    fullname:Joi.string().required(),
    phonenumber:Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    email:Joi.string().trim().lowercase().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password:Joi.ref("password")
}).with('password', 'confirm_password')

export const loginSchema = Joi.object().keys({
    email:Joi.string().trim().lowercase().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  
})

//add Account details
export const accountSchema = Joi.object().keys({
    bankName: Joi.string().required(),
    accountName: Joi.string().required(),
    accountNumber: Joi.string().length(10).required(),
  });
  
  
  //update Account details
export const updateAccountSchema = Joi.object().keys({
    accountName: Joi.string()
   
});
 
// deposit
export const depositSchema = Joi.object().keys({
    amount: Joi.number().min(500).max(1000000).required()
});
// transfer
export const transferSchema = Joi.object().keys({
    recipientEmail: Joi.string().trim().lowercase().required(),
    recipientPhone: Joi.string().regex(/^[a-zA-Z0-9]{11}$/).required(),
    amount: Joi.number().min(100).max(1000000).required(),
    recipient: Joi.string(),
  });
//Generate Token
export const generateToken=(user:{[key:string]:unknown}):unknown=>{
  const pass = `${process.env.JWT_SECRET}` as string
   return jwt.sign(user,pass, {expiresIn:'7d'})
}

export const options ={
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
} 