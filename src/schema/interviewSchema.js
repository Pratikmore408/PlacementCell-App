import mongoose from "mongoose";

// Define interview schema
const interviewSchema = new mongoose.Schema({
    companyname: String,
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference to the Student model
    },
    date: Date,
    result: String
});

// Create Interview model from schema
const InterviewModel = mongoose.model('Interview', interviewSchema);

export default InterviewModel;
