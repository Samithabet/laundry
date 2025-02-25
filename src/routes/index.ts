import express from 'express';

const rootRoutr=express.Router();
import authRoutr from './authRoute';
rootRoutr.use('/auth',authRoutr)
export default rootRoutr