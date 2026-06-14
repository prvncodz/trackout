import mongoose, { HydratedDocument, Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
    avatar?: {
        url: string;
        public_id: string;
    },
    fullname: string;
    email: string;
    height: number;
    weight: number;
    password?: string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserMethods {
    generateAccessToken: () => string,
    generateRefreshToken: () => string,
    isPasswordCorrect: (password: string) => Promise<boolean>,

}

type IUserDocument = HydratedDocument<IUser, IUserMethods>;

const UserSchema = new Schema<IUser, Model<IUser, {}, IUserMethods>>(
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
            min: 50,
            max: 300
        },
        weight: {
            type: Number,
            required: [true, "Weight is required"],
            min: 20,
            max: 500
        },
        password: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash((this.password as string), 10);
    }
});

UserSchema.methods.generateAccessToken = function (this: IUserDocument) {
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

UserSchema.methods.generateRefreshToken = function (this: IUserDocument) {
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

UserSchema.methods.isPasswordCorrect = async function (this: IUserDocument, password: string) {
    if (!password) {
        return false;
    }
    return await bcrypt.compare(password, (this.password as string));
};

const User = mongoose.model<IUser, Model<IUser, {}, IUserMethods>>("User", UserSchema);
export default User;

