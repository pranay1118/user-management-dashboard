const express=require('express');
const Router=express.Router();
const Account=require('../models/account')

Router.post('/account',async(req,res)=>{
    try{
          const account=new Account(req.body);
          const savedAccount=await account.save();
          res.status(200).json({
            status:0,
            data:savedAccount
          })
    }
    catch(err){
       return res.status(400).json({
        status:1,
        message:err.error.message
       })
    }
})

Router.get("/account",async(req,res)=>{
    try{
          const accounts=await Account.find();
          res.status(200).json({
            status:0,
            data:accounts
          })
    }
    catch(err){
       return res.status(400).json({
        status:1,
        message:err.error.message
       })
    }
})
module.exports=Router;