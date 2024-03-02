import InterviewModel from "../schema/interviewSchema.js";
import StudentModel from "../schema/studentSchema.js";


export default class InterviewRepository{

    async addInterview(studentName, studentEmail, companyName, date, time){
        try{
    
            // Find the student by name
            const student = await StudentModel.findOne({email: studentEmail });

            if (!student) {
                throw new Error('Student not found');
            }

            const newdate = new Date(date + 'T' +time); // Combine date and time

            const newInterview = new InterviewModel({
                companyname: companyName,
                student: student._id, // Assign the ObjectId of the student
                date: newdate,
            });   
            await newInterview.save();

            student.interviews.push(newInterview._id);
            await student.save();
            
        }catch(err){
            console.log('Error in saving interview'+' '+err);
            throw err;
        }
        }
    
        async getAll(){
            try{
                // return all interviews
                const interviews = await InterviewModel.find().populate('student'); // Populate student details
                return interviews;
            } catch(err){
                console.log('Error in getting all interviews'+' '+err);
            }  
        }

        async updateResult(interviewId, result){
            try{
                const interview = await InterviewModel.findByIdAndUpdate(interviewId, { result }, { new: true });
                console.log(interview);
                // Update student document
                const student = await StudentModel.findById(interview.student);
                student.results.push({ interview: interview._id, result });
                await student.save();
                console.log(student);

            } catch(err){
                console.log('Error in getting all interviews'+' '+err);
            } 
        }

        async getStudent(id){
            try{              
                const student = await StudentModel.findById(id);       
                return student;

            } catch(err){
                console.log('Error in getting student'+' '+err);
            } 
        }
    }

