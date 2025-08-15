import mongoose , {Schema} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userModel =new Schema({
    user:{
        type: String , 
        required: true,
        lowercase: true,
        unique:true,
        trim:true,
        index: true , //usefull in case of sarching ..
    },
    email:{
        type: String , 
        unique:true,
        required: true,
        lowercase: true,
        trim:true,
    },
    fullName:{
        type: String , 
        required: true,
        lowercase: true,
        trim:true,
        index: true , //usefull in case of sarching ..
    },
    avatar:{
        type:String ,// cloudnary string
        required:  true
    },
    coverImage:{
        type: String // cloudnary string
    },
    watchHistory:{
        type:Schema.Types.ObjestId,
        ref:"Vedio"
    },
    password:{
        type:String , 
        required:[true , 'Password is required']
    },
    refreshToken:{
        type: String
    }

},{
    timestamps : true,
}
)

userModel.pre("save" , async function (next){
    if(!this.isModified("password")) return next(); // agar password modify ni  hua h to mt kro kuch..
    this.password = bcrypt.hash(this.password,10)
    next()
}) // dunctionality jb data  save ho ra ho  uske just pehle encrypt krdo

userModel.methods.isPasswordCorrect = async function( password){
    return await  bcrypt.compare(password , this.password)
}
userModel.methods.generateAccessToken = async function(){
    return jwt.sign(
        // sign in ke liye..
        {    
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userModel.methods.generateRefreshToken = async function(){
    return jwt.sign(
        // sign in ke liye..
        {    
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User" , userModel)