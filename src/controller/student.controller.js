import StudentModel from "../model/student.model.js";
import StudentRepository from "../repository/student.repository.js";
import {createObjectCsvStringifier} from 'csv-writer';


export default class StudentController{
    constructor(){
        this.studentRepository = new StudentRepository();
    }

    async getAddStudentForm(req, res){
        res.render('student/student-add', {
            errorMessage: null,
            userEmail:req.session.userEmail
        })
    }

    async addStudent(req, res){
        try{
            const {name, email, batch, college, status, DSA_Final_Score, WebD_Final_Score, React_Final_Score} = req.body
            const newStudent =   new StudentModel(name, email, batch, college, status, DSA_Final_Score, WebD_Final_Score, React_Final_Score);
            await this.studentRepository.AddStudent(newStudent, email);
            const students = await this.studentRepository.getAll();
                res.render('student/student-list', {
                    students: students,
                    userEmail: req.session.userEmail
                });
        }catch(err){
            console.log("error in adding students"+ err);
            res.render('student/student-add', {
                errorMessage: err.message,
                userEmail:req.session.userEmail
            })
        }
        
    }


    async getAllStudent(req, res){
        try{
            const students = await this.studentRepository.getAll();
            res.render('student/student-list', {
                students: students,
                userEmail:req.session.userEmail
            });
        }catch(err){
            console.log("error in rendering students"+ err);
            res.render('student/student-list', {
                errorMessage: err.message,
                userEmail:req.session.userEmail
            })
        }
    }

    async deleteStudent(req, res){
        try{
            const id = req.params.id;
            await this.studentRepository.deleteStudent(id);
            const students = await this.studentRepository.getAll();
            res.render('student/student-list', {
                students: students,
                userEmail:req.session.userEmail
            });
        }catch(err){
        console.log("error in rendering students"+ err);
        res.render('student/student-list', {
            errorMessage: err.message,
            userEmail:req.session.userEmail
        })
    }
    }

    async downloadStudentData(req, res){
                
            try {
                // Fetch student data with their interviews
                const students = await this.studentRepository.getAll();
                // console.log(students.interviews);
                // Initialize CSV stringifier
                const csvStringifier = createObjectCsvStringifier({
                    header: [
                        { id: 'studentId', title: 'Student ID' },
                        { id: 'studentName', title: 'Student Name' },
                        { id: 'college', title: 'College' },
                        { id: 'status', title: 'Status' },
                        { id: 'dsaScore', title: 'DSA Final Score' },
                        { id: 'webdScore', title: 'WebD Final Score' },
                        { id: 'reactScore', title: 'React Final Score' },
                        { id: 'interviewDate', title: 'Interview Date' },
                        { id: 'company', title: 'Interview Company' },
                        { id: 'interviewResult', title: 'Interview Result' }
                    ]
                });
    
                // Create CSV data
                let csvData = csvStringifier.getHeaderString();
                students.forEach(student => {
                    console.log(student);
                    student.interviews.forEach(interview => {
                        console.log(interview);
                        csvData += csvStringifier.stringifyRecords([{
                            studentId: student._id,
                            studentName: student.name,
                            college: student.college,
                            status: student.status,
                            dsaScore: student.course_scores.DSA_Final_Score,
                            webdScore: student.course_scores.WebD_Final_Score,
                            reactScore: student.course_scores.React_Final_Score,
                            interviewDate: interview.date.toLocaleDateString(),
                            company: interview.companyname,
                            interviewResult: interview.result || 'N/A' // Handle missing result
                        }]);
                    });
                });
    
                // Set response headers for CSV download
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=student_interviews.csv');
                
                // Send CSV data as response
                res.send(csvData);
    
                console.log('CSV file sent successfully.');
            } catch (error) {
                console.error('Error generating and sending CSV file:', error);
                res.status(500).send('Internal Server Error');
            }
        }

        async deleteStudent(req, res){
            try{

            }catch(err){
            console.log("error in rendering students"+ err);
            res.render('student/student-list', {
                errorMessage: err.message,
                userEmail:req.session.userEmail
            })
        }
        }

}