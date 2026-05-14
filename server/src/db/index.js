import mongoose from "mongoose";
import DB_NAME from "../constants.js"

const DbConn = mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
.then(()=> console.log("mongodb connection successfull"))
.catch(()=> console.log("Error while connecting to mongodb with MONGO_URI :",process.env.MONGO_URI))

export default DbConn;
