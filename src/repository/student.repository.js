import StudentModel from "../schema/studentSchema.js";


export default class StudentRepository{
   
    async AddStudent(student, studentEmail){
        console.log(student);
        try{
            const existingstudent = await StudentModel.findOne({email: studentEmail });

            if (!existingstudent) {
                const newStudent = new  StudentModel(student);
                await newStudent.save();
            }else{
                throw new Error('Student Already Exist ');
            }
                  
        }catch(err){
            console.log('Error in saving student'+' '+err);
            throw err
        }
    }
    

    async getAll() {
        try {
            // Return all students with populated interviews
            const students = await StudentModel.find().populate('interviews');
            return students;
        } catch(err) {
            console.log('Error in getting all students', err);
            throw err;
        }  
    }

    async deleteStudent(id){
        try {
            const student = await StudentModel.findOneAndDelete({_id: id});
            console.log(student);
        } catch(err) {
            console.log('Error in Deleting student', err);
            throw err;
        }
        
    }
}