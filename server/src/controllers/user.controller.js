import ApiError from "../utils/ApiError.js"
import User from "../models/user.model.js"
import * as z from "zod";

const userSignUpSchema = {
    fullname: z.string().reuired("fullname is required"),
    email: z.string().email("invalid email").required("email is required"),
    height: z.number().min(20, "height must be at least 20 cm").max(300, "height must be less than 300cm").required("height is required"),
    weight: z.number().min(20, "weight must be at least 20 kg").max(300, "weight must be less than 300kg").required("weight is required"),
    password: z.string().min(3).max(20).required("password is required")
}
async function SignUpUser(req, res) {
    try {
        const { fullname, email, height, weight, password } = req.body
        if (!fullname || !email || !height || !weight) {
            throw new ApiError(400, "all field are required")
        }
        if (!password) {
            throw new ApiError(400, "password is required")
        }
        
        User.create({
            fullname,
            email,
            height,
            weight,
            password
        })
    } catch (error) {
        throw new ApiError(500, "User sign up failed", error.name);
    }
}

export {
    SignUpUser,

}
