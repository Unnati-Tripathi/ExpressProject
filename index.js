import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
});

import mongoose from 'mongoose';
import app from './src/app.js';
import { DB_NAME } from './src/constants.js';
import connectDB from './src/db/index.js';
console.log("MongoDB URL:", process.env.MONGODB_URL);
// function connectDB(){
// }

connectDB()
.then (()=>{
    app.on("error", (error)=>{
        console.log("Error" , error);
        throw error;
    }) //agar app na connect hua ho sahi se..
    
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running on : ${process.env.PORT}`);
    })

    }
). catch((error)=>{
    console.log("Connection Failed " , error);
});


























// (async ()=>{
//     try{
//         const connection = await mongoose.connect(`${process.env.MONGODB_URL}`)
//         app.on("error" , (error)=>{
//             console.log("ERRR" , error);
//             throw error;
//         })
//         app.listen(process.env.PORT , ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })

//     }catch(error){
//         console.error("Error" ,error);
//         throw error;
//     }

// })();
