import { body } from 'express-validator';
import { BadRequest } from 'http-errors';
import prisma from '../../conf/db'; // Adjust the import path as needed
// Custom validation function to check for extra fields
const allowedFields = ['clothesId', 'washingId', 'total', 'isDeleted', 'serviceTypeId', 'cost'];
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
export const createServiceValidations = [
    // clothesId validation
    body('clothesId')
        .notEmpty().withMessage('معرف الملابس مطلوب')
        .isInt().withMessage('يجب أن يكون معرف الملابس رقمًا صحيحًا')
        .custom(async (value) => {
            const clothes = await prisma.clothes.findUnique({ where: { id: value } });
            if (!clothes) {
                throw new BadRequest('معرف الملابس غير صحيح');
            }
        }),

    // serviceTypeId validation
    body('serviceTypeId')
        .notEmpty().withMessage('معرف نوع الخدمة مطلوب')
        .isInt().withMessage('يجب أن يكون معرف نوع الخدمة رقمًا صحيحًا')
        .custom(async (value) => {
            const serviceType = await prisma.serviceType.findUnique({ where: { id: value } });
            if (!serviceType) {
                throw new BadRequest('معرف نوع الخدمة غير صحيح');
            }
        }),

    // cost validation
    body('cost')
        .notEmpty().withMessage('التكلفة مطلوبة')
        .isFloat({ min: 0 }).withMessage('يجب أن تكون التكلفة رقمًا موجبًا'),

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
        checkForExtraFields
];

export const updateServiceValidations = [
    // clothesId validation (optional)
    body('clothesId')
        .optional()
        .isInt().withMessage('يجب أن يكون معرف الملابس رقمًا صحيحًا')
        .custom(async (value) => {
            const clothes = await prisma.clothes.findUnique({ where: { id: value } });
            if (!clothes) {
                throw new BadRequest('معرف الملابس غير صحيح');
            }
        }),

    // serviceTypeId validation (optional)
    body('serviceTypeId')
        .optional()
        .isInt().withMessage('يجب أن يكون معرف نوع الخدمة رقمًا صحيحًا')
        .custom(async (value) => {
            const serviceType = await prisma.serviceType.findUnique({ where: { id: value } });
            if (!serviceType) {
                throw new BadRequest('معرف نوع الخدمة غير صحيح');
            }
        }),

    // cost validation (optional)
    body('cost')
        .optional()
        .isFloat({ min: 0 }).withMessage('يجب أن تكون التكلفة رقمًا موجبًا'),

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
 checkForExtraFields
];