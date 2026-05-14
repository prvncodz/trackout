import mongoose, { Schema } from "mongoose"


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
export default User
