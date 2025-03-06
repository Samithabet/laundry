import express from 'express';
import authRoutr from './auth/authRoute';
import laundryRoutr from './laundry/laundryRoute';
import clothesRoutr from './systemInitialization/clothesRoute';
import washRequest from './washing/washRequestRoute';
const rootRoutr=express.Router();


rootRoutr.use('/auth',authRoutr)
rootRoutr.use('/laundry',laundryRoutr)
rootRoutr.use('/clothes',clothesRoutr)
rootRoutr.use('/washRequest',washRequest)
export default rootRoutr