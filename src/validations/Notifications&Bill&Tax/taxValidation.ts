import { body } from 'express-validator';

export const createTaxValidations = [
    // tax validation
    body('tax')
        .notEmpty().withMessage('قيمة yax مطلوبة')
        .isFloat({ min: 0 }).withMessage('يجب أن تكون قيمة tax رقمًا موجبًا'),

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
];

export const updateTaxValidations = [
    // tax validation (optional)
    body('tax')
        .optional()
        .isFloat({ min: 0 }).withMessage('يجب أن تكون قيمة tax رقمًا موجبًا'),

    // isDeleted validation (optional)
    body('isDeleted')
        .optional()
        .isBoolean().withMessage('يجب أن تكون قيمة isDeleted منطقية (true/false)'),
];