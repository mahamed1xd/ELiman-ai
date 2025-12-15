import mongoose from "mongoose";

let course = {
    id: { type: String, default: () => new Date().getTime().toString(), unique: true },
    name: { type: String, required: true },
    link: {type : String, required: true, unique: true},
    description: { type: String, required: true },
    catagory : {type : String, required: true},
    section : {type : String, required: true},
    createdAt: { type: Date, default: Date.now }
}

const CourseSchema = new mongoose.Schema(course);

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;
