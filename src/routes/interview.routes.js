import express from 'express';
import InterviewController from '../controller/interview.controller.js';

const interviewRouter = express.Router();

const interviewController = new InterviewController();

interviewRouter.get('/add', (req, res)=>{
    interviewController.getAddInterviewForm(req, res)
});

interviewRouter.post('/add', (req, res)=>{
    interviewController.addInterview(req, res)
});

interviewRouter.get('/list', (req, res)=>{
    interviewController.getAllInterviews(req, res)
});

interviewRouter.post('/result', (req, res)=>{
    interviewController.addResult(req, res)
});

interviewRouter.get('/:id', (req, res)=>{
    interviewController.getAddStudentInterviewForm(req, res)
});

// interviewRouter.get('/download', (req, res)=>{
//     interviewController.downloadInterviewData(req, res)
// });

export default interviewRouter;
