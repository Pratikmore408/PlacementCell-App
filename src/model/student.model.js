export default class StudentModel {
    constructor(name, email,batch, college, status, DSA_Final_Score, WebD_Final_Score, React_Final_Score) {
        this.name = name;
        this.email = email;
        this.batch = batch;
        this.college =  college;
        this.status = status ;
        this.course_scores = {
            DSA_Final_Score: DSA_Final_Score,
            WebD_Final_Score: WebD_Final_Score,
            React_Final_Score: React_Final_Score
        };
    }

}