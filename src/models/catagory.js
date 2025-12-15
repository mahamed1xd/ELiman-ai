import mongoose from "mongoose";

const catagory = {
    name: { type: String, required: true },
    id: { type: String, default: () => new Date().getTime().toString(), unique: true },
    nameAr: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}

const CatagorySchema = new mongoose.Schema(catagory);

const Catagory = mongoose.models.Catagory || mongoose.model("Catagory", CatagorySchema);

export default Catagory;
