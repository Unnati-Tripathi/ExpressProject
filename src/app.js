import express from "express";
import cors from "cors";
import cookies from "cookie-parser"
const app= express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
    
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookies())
export default app;
// export {app};  used in case of multiple exports..

