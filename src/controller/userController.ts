import  {Request,Response} from 'express'
import db from "../database/db";
import {v4 as uuid} from 'uuid'
import {registerSchema,loginSchema,options,updateUserSchema,generateToken} from '../utils/utils'
import bcrypt from 'bcryptjs'
import { json } from 'stream/consumers';
class UsersController {
    async createUser(req: Request, res: Response){
        try{
            const id = uuid();
            const validationResult = registerSchema.validate(req.body,options);
            if( validationResult.error){
            return res.status(400).json({
                Error:validationResult.error.details[0].message
            })
            }
            const {username,fullname,password,phonenumber,email} = req.body;
            const duplicatEmail = await db('users').where({email:email}).first();
            const duplicateUsername = await db('users').where({username:username}).first();
            const duplicatePhonenumber = await db('users').where({phonenumber:phonenumber}).first();
            if(duplicatEmail){
            return res.status(409).json({
                msg:"Email is used, please change email" 
            })  
            }
            if(duplicateUsername){
            return res.status(409).json({
                msg:"username is already in use"
            })
            if(duplicatePhonenumber){
                return res.status(409).json({msg:"Phonenumber is already in use"})
            }
            }
            const passwordHash = await bcrypt.hash(password,8)
            const user =  {
                id,
                username,
                fullname,
                password:passwordHash,
                phonenumber,
                email,
                wallet:0.0
            }
            
            const record = await db('users').insert(user)
            res.status(201).json({msg:"User created successfully",user})

        }catch(err){
            console.log(err)
            res.status(500).json({msg:"fail to register"})
        }
       
      
    }

    //login
    async login(req: Request, res: Response){
        try{ 
            const validationResult = loginSchema.validate(req.body,options)
            if( validationResult.error){
               return res.status(400).json({
                  Error:validationResult.error.details[0].message
               })
            }
            const user = await db('users').where({email:req.body.email}).first();
            if(!user) return res.status(404).json({msg:"User not found"})
            const {id} = user
            const token = generateToken({id})
            const validUser = await bcrypt.compare(req.body.password, user.password);
            if(!validUser){
                res.status(401).json({
                    msg:"password does not match"
                })
            }
     
           if(validUser){
              res.cookie("token",token,{
                 httpOnly:true,
                 maxAge:1000 * 60 * 60 * 24
              });
              res.cookie("id",id,{
                 httpOnly:true,
                 maxAge: 1000 * 60 * 24
              })
             
              
              res.status(200).json({
                  msg:"You have successfully logged in",
                  token,
                  user
              })
           }
        
        }catch(err){
            res.status(500).json({
                msg:'failed to login',
                route:'/login'
            })
        }
    }

    async getAllUsers(req: Request, res: Response){
        try{
            const users = await db('users');
            return res.status(200).json({msg:"Successfully fetched all users",users});
            
        }catch(err){
            res.status(500).json({msg:'Unable to Retrieve users'})
        }
        
    }
    async findById(req: Request, res: Response){
        try{
            const {id} = req.params;
            const user = await db('users').where({id:id}).first();
            res.status(200).json(user);
        }catch(err){
            res.status(500).json({msg:'user not found'});
        }
        
    }

    async update(req: Request, res: Response){

        try{
            const  {id} = req.params
       
            const {username,fullname,password,phonenumber,email} = req.body;
            const {error} = updateUserSchema.validate(req.body,options)
                if( error){
                    const msg = error.details.map(err => err.message).join(',')
                    return res.status(400).json({
                    Error:msg
                    })
                }
                const user = await db('users').where({id:id}).first();
                if(!user){
                  return res.status(404).json({
                     msg:"Cannot find existing user",
                  })
                }
                
                let passwordHash;
                if(password){
                    passwordHash = await bcrypt.hash(password,8)
                } 
                
                const updatedUser = await db('users').where({id}).update(
                    {
                        id,
                        username:username || user.username,
                        fullname:fullname || user.fullname,
                        password:passwordHash || user.password,
                        phonenumber:phonenumber || user.phonenumber,
                        email:email || user.email
        
                    }
                )
                const newUser = await db('users').where({id:id}).first();
                res.status(201).json({msg:"User Updated successfully",newUser})
        }catch(err){
                console.log(err)
                res.status(500).json({msg:"Unable to Update User"})
        }
       

    }

    async remove(req: Request, res: Response){
        const {
            id
        } = req.params;

        const user = await db('users').where('id', id).delete();

        res.status(204).json({msg:"user deleted successfully",user});
    }
}

export { UsersController }