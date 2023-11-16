const mongoose=require('mongoose');
const accountSchema=mongoose.Schema({
    uname:String,
    email:String,
    mobile:String,
    password:String
},{timestamps:true})
const Account=new mongoose.model('Account',accountSchema);
module.exports=Account;