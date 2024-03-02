import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    companyname: String,
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    date: Date,
    result:String
});

const InterviewModel = mongoose.model('Interview', interviewSchema);

export default InterviewModel;