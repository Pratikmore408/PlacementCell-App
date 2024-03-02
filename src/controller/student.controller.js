import StudentModel from "../model/student.model.js";
import StudentRepository from "../repository/student.repository.js";
import { createObjectCsvStringifier } from 'csv-writer';

export default class StudentController {
    constructor() {
        // Initialize student repository
        this.studentRepository = new StudentRepository();
    }

    // Method to render the add student form
    async getAddStudentForm(req, res) {
        res.render('student/student-add', {
            errorMessage: null,
            userEmail: req.session.userEmail
        });
    }

    // Method to handle adding a new student
    async addStudent(req, res) {
        try {
            const { name, email, batch, college, status, DSA_Final_Score, WebD_Final_Score, React_Final_Score } = req.body;
            // Create new student object
            const newStudent = new StudentModel(name, email, batch, college, status, DSA_Final_Score, WebD_Final_Score, React_Final_Score);
            // Add student to the database
            await this.studentRepository.AddStudent(newStudent, email);
            // Retrieve updated list of students
            const students = await this.studentRepository.getAll();
            // Render student list page with updated data
            res.render('student/student-list', {
                students: students,
                userEmail: req.session.userEmail
            });
        } catch (err) {
            console.log("error in adding students" + err);
            // Render add student page with error message
            res.render('student/student-add', {
                errorMessage: err.message,
                userEmail: req.session.userEmail
            });
        }
    }

    // Method to retrieve all students
    async getAllStudent(req, res) {
        try {
            // Retrieve all students from the database
            const students = await this.studentRepository.getAll();
            // Render student list page with data
            res.render('student/student-list', {
                students: students,
                userEmail: req.session.userEmail
            });
        } catch (err) {
            console.log("error in rendering students" + err);
            // Render student list page with error message
            res.render('student/student-list', {
                errorMessage: err.message,
                userEmail: req.session.userEmail
            });
        }
    }

    // Method to delete a student
    async deleteStudent(req, res) {
        try {
            const id = req.params.id;
            // Delete student from the database
            await this.studentRepository.deleteStudent(id);
            // Retrieve updated list of students
            const students = await this.studentRepository.getAll();
            // Render student list page with updated data
            res.render('student/student-list', {
                students: students,
                userEmail: req.session.userEmail
            });
        } catch (err) {
            console.log("error in rendering students" + err);
            // Render student list page with error message
            res.render('student/student-list', {
                errorMessage: err.message,
                userEmail: req.session.userEmail
            });
        }
    }

    // Method to download student data as CSV
    async downloadStudentData(req, res) {
        try {
            // Fetch student data with their interviews
            const students = await this.studentRepository.getAll();
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
                student.interviews.forEach(interview => {
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
}
