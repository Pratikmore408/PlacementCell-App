import express from 'express';
import InterviewController from '../controller/interview.controller.js';

const interviewRouter = express.Router();
const interviewController = new InterviewController();

// Route to render the add interview form
interviewRouter.get('/add', (req, res) => {
    interviewController.getAddInterviewForm(req, res);
});

// Route to handle adding a new interview
interviewRouter.post('/add', (req, res) => {
    interviewController.addInterview(req, res);
});

// Route to render the list of all interviews
interviewRouter.get('/list', (req, res) => {
    interviewController.getAllInterviews(req, res);
});

// Route to add result to an interview
interviewRouter.post('/result', (req, res) => {
    interviewController.addResult(req, res);
});

// Route to render the form for adding a student to an interview
interviewRouter.get('/:id', (req, res) => {
    interviewController.getAddStudentInterviewForm(req, res);
});

export default interviewRouter;
