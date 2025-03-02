const { body } = require('express-validator');
import { BadRequest } from "http-errors";
import prisma from "../conf/db";


// Validation rules for creating or updating a User
export const registerValidations = [
  // Email validation
  body('email')
    .isEmail().withMessage('يجب أن يكون البريد الإلكتروني صحيحا') // Must be a valid email
    .custom(async (value: any) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) {
        throw new BadRequest('البريد الإلكتروني مستخدم بالفعل'); // Email already in use
      }
    }),

  // Username validation
  body('userName')
    .notEmpty().withMessage('اسم المستخدم مطلوب') // Username is required
    .isLength({ min: 3 }).withMessage('يجب أن يكون اسم المستخدم على الأقل 3 أحرف') // Username must be at least 3 characters
    .custom(async (value: any) => {
      const user = await prisma.user.findUnique({ where: { userName: value } });
      if (user) {
        throw new BadRequest('اسم المستخدم مستخدم بالفعل'); // Username already in use
      }
    }),

  // Password validation
  body('passWord')
    .notEmpty().withMessage('كلمة المرور مطلوبة') // Password is required
    .isLength({ min: 6 }).withMessage('يجب أن تكون كلمة المرور على الأقل 6 أحرف'), // Password must be at least 6 characters

  // Name validation
  body('name')
    .notEmpty().withMessage('الاسم مطلوب'), // Name is required

  // Phone validation
  body('phoen')
    .notEmpty().withMessage('رقم الهاتف مطلوب') // Phone is required
    .isString().withMessage('يجب أن يكون رقم الهاتف نصًا'),


  // Address validation
  body('address')
    .notEmpty().withMessage('العنوان مطلوب') // Address is required
  .isString().withMessage('يجب أن يكون العنوان نصًا'),

  // Role ID validation
  body('roleId')
    .notEmpty().withMessage('معرف الدور مطلوب') // Role ID is required
    .isInt().withMessage('يجب أن يكون معرف الدور رقمًا صحيحًا'), // Role ID must be an integer

  // Package ID validation (optional)
  body('packageId')
    .optional()
    .isInt().withMessage('يجب أن يكون معرف الباقة رقمًا صحيحًا'), // Package ID must be an integer

  // Laundry ID validation (optional)
  body('laundryId')
    .optional()
    .isInt().withMessage('يجب أن يكون معرف المغسلة رقمًا صحيحًا'), // Laundry ID must be an integer
];


