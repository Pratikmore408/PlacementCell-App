import StudentModel from "../schema/studentSchema.js";

export default class StudentRepository {
   
    // Method to add a new student
    async AddStudent(student, studentEmail) {
        console.log(student);
        try {
            // Check if student already exists
            const existingStudent = await StudentModel.findOne({ email: studentEmail });

            if (!existingStudent) {
                // Create and save a new student
                const newStudent = new StudentModel(student);
                await newStudent.save();
            } else {
                throw new Error('Student Already Exist');
            }
                  
        } catch (err) {
            console.log('Error in saving student' + ' ' + err);
            throw err;
        }
    }

    // Method to retrieve all students with populated interviews
    async getAll() {
        try {
            // Return all students with populated interviews
            const students = await StudentModel.find().populate('interviews');
            return students;
        } catch (err) {
            console.log('Error in getting all students', err);
            throw err;
        }  
    }
}
