import express from 'express';
import authController from '../controllers/authController';
const authRoutr=express.Router();


authRoutr.post('/login',authController.Login)
export default authRoutr