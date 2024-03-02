import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';
import { connectToDb } from './src/config/mongoose.js';
import userRouter from './src/routes/user.routes.js';
import studentRouter from './src/routes/students.routes.js';
import { auth } from './src/middleware/auth.middleware.js';
import interviewRouter from './src/routes/interview.routes.js';


dotenv.config();
// create the server
const app = express();

const dbPassword = process.env.DB_PASSWORD;

// encode the password
const encodedPassword = encodeURIComponent(dbPassword);

const mongoUrl = `mongodb+srv://pratikmore408:${encodedPassword}@cluster0.bibaswd.mongodb.net/PlacementCellApp?retryWrites=true&w=majority`

const store = connectMongo.create({
  mongoUrl: mongoUrl,
  autoRemove: "disabled",
},  (err) => {
   console.log(err || "Connection is established with MongoDB");
});

// configure session
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 24*60*60*1000},
    store: store
}));


app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// set the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(path.resolve(), 'src', 'view'))
app.use(ejsLayouts);

// call the user router
app.use('/', userRouter);
app.use('/student',auth, studentRouter);
app.use('/interview',auth, interviewRouter);

app.use(express.static('src/view'))

// listen the server
app.listen(5000, (req, res)=>{
    console.log(`app is running on port 5000`);
    connectToDb();
})
