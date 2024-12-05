import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isSubscribed: {
        type: Boolean,
        required: true,
        default: false

    }
}, { timestamps: true })

const User = mongoose.model('user', userSchema);
export default User