import ApiError from "../utils/ApiError.js"

async function SignUp(req, res) {
    const { fullname, email, height, weight ,password} = req.body
    if (!fullname || !email || !height || !weight) {
        throw new ApiError(400,"all field are required")
    }
    if(!password){
        throw new ApiError(400,"password is required")
    }

    User.create({
        fullname,
        email,
        height,
        weight,
        password
    })
}
