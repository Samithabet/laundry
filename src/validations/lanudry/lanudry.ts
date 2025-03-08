const { body } = require('express-validator');
import { BadRequest } from "http-errors";
import prisma from "../../conf/db";
const allowedFields = ['name', 'ownerId', 'isDeleted'];
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
// Validation rules for creating a Laundry
export const createLaundryValidations = [
  // Name validation
  body('name')
    .notEmpty().withMessage('اسم المغسلة مطلوب') // Name is required
    .isLength({ min: 3 }).withMessage('يجب أن يكون اسم المغسلة على الأقل 3 أحرف'), // Name must be at least 3 characters

  // Owner ID validation
  body('ownerId')
    .notEmpty().withMessage('معرف المالك مطلوب') // Owner ID is required
    .isInt().withMessage('يجب أن يكون معرف المالك رقمًا صحيحًا') // Owner ID must be an integer
    .custom(async (value: any) => {
      const owner = await prisma.user.findUnique({ where: { id: value } });
      if (!owner) {
        throw new BadRequest('معرف المالك غير صحيح'); // Invalid owner ID
      }
    }),

  // isDeleted validation (optional, default is false)
  body('isDeleted')
    .optional()
    .isBoolean().withMessage('يجب أن تكون القيمة منطقية (true/false)'), // Must be a boolean
    checkForExtraFields

];

// Validation rules for updating a Laundry
export const updateLaundryValidations = [
  // Name validation (optional)
  body('name')
    .optional()
    .notEmpty().withMessage('اسم المغسلة مطلوب') // Name is required if provided
    .isLength({ min: 3 }).withMessage('يجب أن يكون اسم المغسلة على الأقل 3 أحرف'), // Name must be at least 3 characters

  // Owner ID validation (optional)
  body('ownerId')
    .optional()
    .isInt().withMessage('يجب أن يكون معرف المالك رقمًا صحيحًا') // Owner ID must be an integer
    .custom(async (value: any) => {
      const owner = await prisma.user.findUnique({ where: { id: value } });
      if (!owner) {
        throw new BadRequest('معرف المالك غير صحيح'); // Invalid owner ID
      }
    }),

  // isDeleted validation (optional)
  body('isDeleted')
    .optional()
    .isBoolean().withMessage('يجب أن تكون القيمة منطقية (true/false)'), // Must be a boolean
    checkForExtraFields
];