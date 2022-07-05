import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    roll: Number,
    email: String,
    contact: Number
});

export default mongoose.model("users", userSchema);