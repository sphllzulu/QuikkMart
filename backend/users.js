import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const userSchema= mongoose.Schema({
    email:{
        type:String, required:true, unique:true, validate:[validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type:String, required:true, validator:function(value){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();
    this.password= await bcrypt.hash(this.password,12);
    next();
})

export default mongoose.model("Users", userSchema)