import InterviewRepository from "../repository/interview.repository.js";
import { createObjectCsvStringifier } from 'csv-writer';


export default class InterviewController{
    constructor(){
        this.interviewRepository = new InterviewRepository();
    }

    async getAddInterviewForm(req, res){
        // get the interview form
        res.render('interview/interview-form', {
            errorMessage: null,
            userEmail: req.session.userEmail  
        });
    }

    async getAddStudentInterviewForm(req, res){
        // get the id
        const id = req.params.id;
        // get student details from id
        const student = await this.interviewRepository.getStudent(id);
        // render interview form with student details
        res.render('interview/interview-form-from-student', {
            errorMessage: null,
            student:student,
            userEmail: req.session.userEmail  
        });
    }

    async getAllInterviews(req, res){
        try{
            // get the list of all interviews
            const interviews = await this.interviewRepository.getAll();
            // render the interview form
            res.render('interview/interview-list', {
            userEmail: req.session.userEmail,
            interviews: interviews, 
            })
        }catch(err){
            console.log("error in adding interviews"+ err);
        }
        
    }

    async addInterview(req, res){
        try{
            // get the data from body
            const {student, email, company, date, time} = req.body;
            // add interview
            await this.interviewRepository.addInterview(email, company, date, time);
            const interviews = await this.interviewRepository.getAll();
            // render all interviews
            res.render('interview/interview-list', {
                userEmail: req.session.userEmail,
                interviews: interviews, 
            })
        }catch(err){
            // if errors return the interview form agian with err
            console.log("error in rendering interviews"+ err);
            res.render('interview/interview-form', {
                errorMessage: err.message,
                userEmail: req.session.userEmail  
            });
        }
    }

    async addResult(req, res){
        try{
            // get the data from body
            const {interviewId, result} = req.body;
            // update the result
            await this.interviewRepository.updateResult(interviewId, result);
            const interviews = await this.interviewRepository.getAll();
            // render the interview list with result
            res.render('interview/interview-list', {
                userEmail: req.session.userEmail,
                interviews: interviews, 
            })
        }catch(err){
            // if errors return the interview list again with err
            console.log("error in rendering interviews"+ err);
            res.render('interview/interview-list', {
                userEmail: req.session.userEmail  
            });
        }
    }
}