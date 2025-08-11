// import dotenv from "dotenv";
// dotenv.config({
//     path:'../.env'
// })
// import express from 'express';
// const app=express();
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import app from '../app.js';

const connectDB =  async()=>{
    try{
        const connectionDB = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        )
        console.log(`\n MongoDB connected  !! DB_HOST : ${connectionDB.connection.host}`)
    }catch(error){
        console.log("Error: " ,error);
        process.exit(1);
    }
}
export default connectDB;