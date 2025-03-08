import express from 'express';
import authRoutr from './auth/authRoute';
import laundryRoutr from './ownerLanudry/laundryRoute';
import clothesRoutr from './systemInitialization/clothesRoute';
import washRequest from './washing/washRequestRoute';
import employRoutr from './employ/employ'
import userRoutr from './users/usersRouter';
import serviceTypeRoutr from './systemInitialization/serviceType'
import serviceRoute from './systemInitialization/serviceRoute';
import customerRoute from './systemInitialization/customerRoute';
import lanudryRoutr from './lanudry/lanudryRoute';
import taxRoutr from './systemInitialization/taxRoute';
const rootRoutr=express.Router();


rootRoutr.use('/auth',authRoutr)
rootRoutr.use('/ownerLanudry',laundryRoutr)
rootRoutr.use('/clothes',clothesRoutr)
rootRoutr.use('/washRequest',washRequest)
rootRoutr.use('/employ',employRoutr)
rootRoutr.use('/user',userRoutr)
rootRoutr.use('/serviceType',serviceTypeRoutr)
rootRoutr.use('/service',serviceRoute)
rootRoutr.use('/customer',customerRoute)
rootRoutr.use('/lanudry',lanudryRoutr)
rootRoutr.use('/tax',taxRoutr)
export default rootRoutr