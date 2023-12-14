import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F009%2F734%2F564%2Fsmall%2Fdefault-avatar-profile-icon-of-social-media-user-vector.jpg&tbnid=vdTYYTKIs_rlxM&vet=12ahUKEwiw66TfzpyCAxWD7jgGHbDRBHYQMygPegUIARCTAQ..i&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&w=200&h=200&q=profile%20img&ved=2ahUKEwiw66TfzpyCAxWD7jgGHbDRBHYQMygPegUIARCTAQ"
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;