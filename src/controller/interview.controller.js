import InterviewRepository from "../repository/interview.repository.js";
import { createObjectCsvStringifier } from 'csv-writer';


export default class InterviewController{
    constructor(){
        this.interviewRepository = new InterviewRepository();
    }

    async getAddInterviewForm(req, res){
        res.render('interview/interview-form', {
            errorMessage: null,
            userEmail: req.session.userEmail  
        });
    }

    async getAddStudentInterviewForm(req, res){
        const id = req.params.id;
        console.log(id);
        const student = await this.interviewRepository.getStudent(id);
        res.render('interview/interview-form-from-student', {
            errorMessage: null,
            student:student,
            userEmail: req.session.userEmail  
        });
    }

    async getAllInterviews(req, res){
        try{
            const interviews = await this.interviewRepository.getAll();
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
            const {student, email, company, date, time} = req.body;
            await this.interviewRepository.addInterview(student, email, company, date, time);
            const interviews = await this.interviewRepository.getAll();
            res.render('interview/interview-list', {
                userEmail: req.session.userEmail,
                interviews: interviews, 
            })
        }catch(err){
            console.log("error in rendering interviews"+ err);
            res.render('interview/interview-form', {
                errorMessage: err.message,
                userEmail: req.session.userEmail  
            });
        }
    }

    async addResult(req, res){
        try{
            const {interviewId, result} = req.body;
            await this.interviewRepository.updateResult(interviewId, result);
            const interviews = await this.interviewRepository.getAll();
            // console.log(interviews);
            res.render('interview/interview-list', {
                userEmail: req.session.userEmail,
                interviews: interviews, 
            })
        }catch(err){
            console.log("error in rendering interviews"+ err);
            res.render('interview/interview-form', {
                errorMessage: err.message,
                userEmail: req.session.userEmail  
            });
        }
    }
}