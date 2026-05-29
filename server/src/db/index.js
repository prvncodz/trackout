import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const DbConn = async () => {
    try {
        const conn = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`,
        );
        console.log("mongodb connection successfull");
        console.log("host:", conn.connection.host);
        console.log("name:", conn.connection.name);
    } catch (error) {
        console.error(
            "Error while connecting to mongodb with MONGO_URI :",
            process.env.MONGO_URI,
        );
        console.log("Error :", error.message);
    }
};
export default DbConn;
