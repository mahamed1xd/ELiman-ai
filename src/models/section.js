import mongoose from "mongoose";

const section = {
    name: { type: String, required: true },
    nameAr: { type: String, required: true },
    description: { type: String, required: false },
    catagory: { type: String, required: true },
    id: { type: String, default: () => new Date().getTime().toString(), unique: true },
    createdAt: { type: Date, default: Date.now }
}

const SectionSchema = new mongoose.Schema(section);

const Section = mongoose.models.Section || mongoose.model("Section", SectionSchema);

export default Section;
