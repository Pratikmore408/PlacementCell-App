import mongoose from "mongoose";

// Define student schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    batch: { type: String, required: true },
    college: { type: String, required: true },
    status: { type: String, enum: ['placed', 'not_placed'], required: true },
    course_scores: {
        DSA_Final_Score: { type: Number, required: true },
        WebD_Final_Score: { type: Number, required: true },
        React_Final_Score: { type: Number, required: true }
    },
    interviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview' // Reference to the Interview model
    }],
    results: [{
        company_name: { type: String },
        result: { type: String, enum: ['PASS', 'FAIL', 'ON-HOLD', 'DID NOT ATTEMPT'] }
    }]
});

// Create Student model from schema
const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;
