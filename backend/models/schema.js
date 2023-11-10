const mongoose = require('mongoose');
const validator = require('validator');


const todo_schema = new mongoose.Schema({
    name:{
         type:String,
         required:true,
         minlength:5
    },
    
    location:{
         type:String,
         required:true
    },
    email:{
         type:String,
         required:true,
         validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Email is not valid");
          }
        }
    },
    password:{
         type:String,
         required:true,
         minlength:5
    },
    date:{
         type:Date,
         default:Date.now
    },   
})

const User = mongoose.model('users',todo_schema);

module.exports = User;