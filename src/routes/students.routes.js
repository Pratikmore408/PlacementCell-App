import express from 'express';
import StudentController from '../controller/student.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const studentRouter = express.Router();
const studentController = new StudentController();

// Route to render the add student form
studentRouter.get('/add', auth, (req, res) => {
    studentController.getAddStudentForm(req, res);
});

// Route to handle adding a new student
studentRouter.post('/add', auth, (req, res) => {
    studentController.addStudent(req, res);
});

// Route to render the list of students
studentRouter.get('/list', auth, (req, res) => {
    studentController.getAllStudent(req, res);
});

// Route to download student data as CSV
studentRouter.get('/download', auth, (req, res) => {
    studentController.downloadStudentData(req, res);
});

export default studentRouter;
