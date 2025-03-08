import { body } from 'express-validator';
import { BadRequest } from 'http-errors';
import prisma from '../../conf/db';
const allowedFields = ['customerId', , 'isDeleted'];
const checkForExtraFields = (req: any, res: any, next: any) => {
    const bodyFields = Object.keys(req.body);
  
    // Check if any field in the body is not in the allowedFields list
    const extraFields = bodyFields.filter(field => !allowedFields.includes(field));
  
    if (extraFields.length > 0) {
      return res.status(400).json({
        message: `الحقول غير مسموح بها: ${extraFields.join(', ')}`,
      });
    }
  
    // If there are validation errors, return them
  
    next();
  };
export const createBillValidations = [
    // customerId validation
    body('customerId')
        .notEmpty().withMessage('customerId مطلوب')
        .isInt({ min: 1 }).withMessage('يجب أن تكون قيمة customerId رقمًا صحيحًا موجبًا')
.custom(async (value) => {
    const customer = await prisma.customer.findUnique({ where: { id: value } });
    if (!customer) {
        throw new BadRequest("هذا العميل غير موجود");
    }
   
}),
    
   

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
        checkForExtraFields
]
export const updateBillValidations = [
    // customerId validation (optional)
    body('customerId')
        .optional()
        .isInt({ min: 1 }).withMessage('يجب أن تكون قيمة customerId رقمًا صحيحًا موجبًا'),


    

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
        checkForExtraFields

];