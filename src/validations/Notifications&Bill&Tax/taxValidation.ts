import { body } from 'express-validator';
const allowedFields = ['scot', 'isDeleted'];
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

export const createTaxValidations = [
    // tax validation
    body('scot')
        .notEmpty().withMessage('قيمة yax مطلوبة')
        .isFloat({ min: 0 }).withMessage('يجب أن تكون قيمة tax رقمًا موجبًا'),

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
    checkForExtraFields
];

export const updateTaxValidations = [
    // tax validation (optional)
    body('scot')
        .optional()
        .isFloat({ min: 0 }).withMessage('يجب أن تكون قيمة tax رقمًا موجبًا'),

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
    checkForExtraFields
];