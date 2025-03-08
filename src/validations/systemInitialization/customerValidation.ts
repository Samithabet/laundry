import { body } from 'express-validator';
import { BadRequest } from 'http-errors';
import prisma from '../../conf/db'; // Adjust the import path as needed
const allowedFields = ['name', 'customerCode', 'isDeleted', 'phoen','laundryId' ];
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
export const createCustomerValidations = [
    // name validation
    body('name')
        .notEmpty().withMessage('الاسم مطلوب')
        .isLength({ min: 3 }).withMessage('يجب أن يكون الاسم على الأقل 3 أحرف')
        .custom(async (value,{req}) => {
            const user = req.user;
            req.body={
                ...req.body,
                laundryId:user?.laundryId

            }
            
            
        }),

    // customerCode validation
    body('customerCode')
        .notEmpty().withMessage('كود العميل مطلوب')
        .custom(async (value, { req }) => {
            
            const existingCustomer = await prisma.customer.findFirst({
                where: {
                    customerCode: value,
            
                },
            });
            if (existingCustomer) {
                throw new BadRequest('كود العميل مستخدم بالفعل لهذه المغسلة');
            }
        }),

    // phone validation
    body('phoen')
        .notEmpty().withMessage('رقم الهاتف مطلوب')
        .isMobilePhone('any').withMessage('رقم الهاتف غير صحيح'),



    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
        checkForExtraFields
];

export const updateCustomerValidations = [
    // name validation (optional)
    body('name')
        .optional()
        .isLength({ min: 3 }).withMessage('يجب أن يكون الاسم على الأقل 3 أحرف'),

    // customerCode validation (optional)
    body('customerCode')
        .optional()
        .custom(async (value, { req }) => {
            
            const existingCustomer = await prisma.customer.findFirst({
                where: {
                    customerCode: value,
                
                },
            });
            if (existingCustomer) {
                throw new BadRequest('كود العميل مستخدم بالفعل لهذه المغسلة');
            }
        }),

    // phone validation (optional)
    body('phone')
        .optional()
        .isMobilePhone('any').withMessage('رقم الهاتف غير صحيح'),

   
   

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
        checkForExtraFields
];