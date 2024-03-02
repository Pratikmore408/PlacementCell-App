// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';

// Import database connection function and routers
import { connectToDb } from './src/config/mongoose.js';
import userRouter from './src/routes/user.routes.js';
import studentRouter from './src/routes/students.routes.js';
import { auth } from './src/middleware/auth.middleware.js';
import interviewRouter from './src/routes/interview.routes.js';

// Load environment variables
dotenv.config();

// Create Express app instance
const app = express();

// Extract DB password from environment variables
const dbPassword = process.env.DB_PASSWORD;

// Encode the password for use in the MongoDB connection URL
const encodedPassword = encodeURIComponent(dbPassword);

// Construct MongoDB connection URL
const mongoUrl = `mongodb+srv://pratikmore408:${encodedPassword}@cluster0.bibaswd.mongodb.net/PlacementCellApp?retryWrites=true&w=majority`;

// Create MongoDB session store
const store = connectMongo.create({
  mongoUrl: mongoUrl,
  autoRemove: "disabled",
},  (err) => {
   console.log(err || "Connection is established with MongoDB");
});

// Configure session middleware
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 24*60*60*1000},
    store: store
}));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing URL-encoded and JSON request bodies
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Set the view engine to EJS and specify views directory
app.set('view engine', 'ejs');
app.set("views", path.join(path.resolve(), 'src', 'view'));
app.use(ejsLayouts);

// Routes
app.use('/', userRouter); 
app.use('/student', auth, studentRouter); 
app.use('/interview', auth, interviewRouter); 

// Serve static files
app.use(express.static('src/view'));

// Start the server listening on port 5000
app.listen(5000, (req, res) => {
    console.log(`app is running on port 5000`);
    connectToDb(); // Connect to MongoDB
});
