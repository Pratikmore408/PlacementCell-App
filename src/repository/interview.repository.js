import InterviewModel from "../schema/interviewSchema.js";
import StudentModel from "../schema/studentSchema.js";

export default class InterviewRepository {

    // Method to add a new interview for a student
    async addInterview(studentEmail, companyName, date, time) {
        try {
            // Find the student by email
            const student = await StudentModel.findOne({ email: studentEmail });

            if (!student) {
                throw new Error('Student not found');
            }

            // Combine date and time
            const newdate = new Date(date + 'T' + time);

            // Create a new interview instance
            const newInterview = new InterviewModel({
                companyname: companyName,
                student: student._id, // Assign the ObjectId of the student
                date: newdate,
            });
            
            // Save the new interview
            await newInterview.save();

            // Update student's interviews array
            student.interviews.push(newInterview._id);
            await student.save();
            
        } catch (err) {
            console.log('Error in saving interview' + ' ' + err);
            throw err;
        }
    }

    // Method to retrieve all interviews with student details
    async getAll() {
        try {
            // Return all interviews with populated student details
            const interviews = await InterviewModel.find().populate('student');
            return interviews;
        } catch (err) {
            console.log('Error in getting all interviews' + ' ' + err);
        }  
    }

    // Method to update interview result and update corresponding student document
    async updateResult(interviewId, result) {
        try {
            // Update interview document
            const interview = await InterviewModel.findByIdAndUpdate(interviewId, { result }, { new: true });
            console.log(interview);

            // Update student document
            const student = await StudentModel.findById(interview.student);
            student.results.push({ interview: interview._id, result });
            await student.save();
            console.log(student);

        } catch (err) {
            console.log('Error in updating interview result' + ' ' + err);
        } 
    }

    // Method to retrieve a student by ID
    async getStudent(id) {
        try {              
            const student = await StudentModel.findById(id);       
            return student;

        } catch (err) {
            console.log('Error in getting student' + ' ' + err);
        } 
    }
}
