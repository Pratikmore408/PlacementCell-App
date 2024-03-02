import express from 'express';

import StudentController from '../controller/student.controller.js';
import { auth } from '../middleware/auth.middleware.js';


const studentRouter = express.Router();

const studentController = new StudentController();

studentRouter.get('/add', auth, (req, res)=>{
    studentController.getAddStudentForm(req, res)
});

studentRouter.post('/add', auth, (req, res)=>{
    studentController.addStudent(req, res)
});

studentRouter.get('/list', auth, (req, res)=>{
    studentController.getAllStudent(req, res)
});

studentRouter.post('/delete/:id', auth, (req, res)=>{
    studentController.deleteStudent(req, res)
});

studentRouter.get('/download', auth, (req, res)=>{
    studentController.downloadStudentData(req, res)
});


export default studentRouter;
