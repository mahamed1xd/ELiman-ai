import mongoose from "mongoose";

let user = {
    id: { type: String, default: () => new Date().getTime().toString() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
}

const UserSchema = new mongoose.Schema(user);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;