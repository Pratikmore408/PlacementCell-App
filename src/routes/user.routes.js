import express from 'express';
import UserController from '../controller/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const userRouter = express.Router();
const userController = new UserController();

// Route to render the home page
userRouter.get('/', auth, (req, res) => {
    userController.getHome(req, res);
});

// Route to render the signup form
userRouter.get('/signup', (req, res) => {
    userController.getSignup(req, res);
});

// Route to handle signup form submission
userRouter.post('/signup', (req, res) => {
    userController.postSignup(req, res);
});

// Route to render the signin form
userRouter.get('/signin', (req, res) => {
    userController.getSignin(req, res);
});

// Route to handle signin form submission
userRouter.post('/signin', (req, res) => {
    userController.postSignin(req, res);
});

// Route to sign out
userRouter.get('/signout', auth, (req, res) => {
    userController.signOut(req, res);
});

export default userRouter;
