import { body } from 'express-validator';
import { BadRequest } from 'http-errors';
import prisma from '../../conf/db'; // Adjust the import path as needed

export const createCustomerValidations = [
    // name validation
    body('name')
        .notEmpty().withMessage('الاسم مطلوب')
        .isLength({ min: 3 }).withMessage('يجب أن يكون الاسم على الأقل 3 أحرف')
        .custom(async (value,{req}) => {
            const email = req.user;
            const user= await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })

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
    body('phone')
        .notEmpty().withMessage('رقم الهاتف مطلوب')
        .isMobilePhone('any').withMessage('رقم الهاتف غير صحيح'),



    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
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
];