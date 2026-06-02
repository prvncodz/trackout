import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser extends mongoose.Document {
    avatar?: {
        url: string;
        public_id: string;
    },
    fullname: string;
    email: string;
    height: number;
    weight: number;
    password: string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
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
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
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
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [3, "Password must be at least 3 characters long!"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            fullname: this.fullname,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
        },
    );
};

UserSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            fullname: this.fullname,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any,
        },
    );
};

UserSchema.methods.isPasswordCorrect = async function (password: string) {
    if (!password) {
        return false;
    }
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
