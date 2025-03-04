import express from 'express';
import authRoutr from './authRoute';
import laundryRoutr from './laundry/laundryRoute';
import clothesRoutr from './systemInitialization/clothesRoute';
const rootRoutr=express.Router();


rootRoutr.use('/auth',authRoutr)
rootRoutr.use('/laundry',laundryRoutr)
rootRoutr.use('/clothes',clothesRoutr)
export default rootRoutr