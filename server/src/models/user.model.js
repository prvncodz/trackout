import mongoose, { Schema } from "mongoose"
import bycrypt from "bycrypt"

const UserSchema = new Schema({
    avatar: {
        url: String,
        public_id: String,
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        unique: [true, "Fullname already taken"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long!"],
        maxlength: [20, "Name cannot exceed 50 characters!"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "This email is already registered"],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    height: {
        type: Number,
        required: [true, "Height is required"],
        trim: true,
        minlength: [2, "Invalid height!"],
        maxlength: [3, "Invalid height!"],
    },
    weight: {
        type: Number,
        required: [true, "Weight is required"],
        trim: true,
        minlength: [2, "Invalid weight!"],
        maxlength: [3, "Invalid weight!"],
    },
    previousWorkouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Log'
    }],
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        lowercase: [true, "Password must be in lowercase"],
        unique: false,
    },
    refreshToken: {
        type: String,
        unique: [true, "This refresh token is already in use"],
        trim: true,
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

User.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bycrypt.hash(this.password, 10)
        return next()
    } else {
        return next()
    }
});

User.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            fullname: this.fullname,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

User.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            fullname: this.fullname,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

User.methods.isPasswordCorrect = async function (password) {
    return await bycrypt.compare(password, this.password)
}

export default User
