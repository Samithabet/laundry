import express from 'express';
import authRoutr from './authRoute';
import laundryRoutr from './laundry/laundryRoute';
const rootRoutr=express.Router();


rootRoutr.use('/auth',authRoutr)
rootRoutr.use('/laundry',laundryRoutr)
export default rootRoutr