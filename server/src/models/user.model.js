import mongoose, { Schema } from "mongoose"
import bycrypt from "bycrypt"

const UserSchema = new Schema({
    avatar: {
        url: String,
        public_id: String
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    previousWorkouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Log'
    }],
    password: {
        type: String,
        required: true
    },
    refreshToken: String
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
