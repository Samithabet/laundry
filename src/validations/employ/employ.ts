const { body } = require('express-validator');
import { BadRequest } from "http-errors";
import prisma from "../../conf/db";
import { hashPassword } from "../../conf/generateToken";
import {RoleName} from "../../enum/role";

// Validation rules for creating or updating a User
export const createEmployValidations = [
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
  .isLength({ min: 6 }).withMessage('يجب أن تكون كلمة المرور على الأقل 6 أحرف') // Password must be at least 6 characters
 

   
  ,
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

  
  // Package ID validation (optional)
 
  // Laundry ID validation (optional)
  body('laundryId')
   
    .isInt().withMessage('يجب أن يكون معرف المغسلة رقمًا صحيحًا') // Laundry ID must be an integer
    .custom(async (value: any) => {
      const laundry = await prisma.laundry.findUnique({ where: { id: value } });
      if (!laundry) {
        throw new BadRequest('معرف المغسلة غير صحيح'); // Invalid laundry ID
      }
    })
];
export const updatEemployValidations = [
  // Email validation
  body('email')
  .optional()
    .isEmail().withMessage('يجب أن يكون البريد الإلكتروني صحيحا') // Must be a valid email
    .custom(async (value: any) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) {
        throw new BadRequest('البريد الإلكتروني مستخدم بالفعل'); // Email already in use
      }
    }),

  // Username validation
  body('userName')
  .optional()
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
  .optional()
    .notEmpty().withMessage('كلمة المرور مطلوبة') // Password is required
    .isLength({ min: 6 }).withMessage('يجب أن تكون كلمة المرور على الأقل 6 أحرف') // Password must be at least 6 characters
.custom(async (value: string,{req}: any) => {

  req.body={
    ...req.body,
    passWord:await hashPassword(value)
  }
}),
  // Name validation
  body('name')
  .optional()
    .notEmpty().withMessage('الاسم مطلوب'), // Name is required

  // Phone validation
  body('phoen')
  .optional()
    .notEmpty().withMessage('رقم الهاتف مطلوب') // Phone is required
    .isString().withMessage('يجب أن يكون رقم الهاتف نصًا'),


  // Address validation
  body('address')
  .optional()
    .notEmpty().withMessage('العنوان مطلوب') // Address is required
  .isString().withMessage('يجب أن يكون العنوان نصًا'),

  
  // Package ID validation (optional)
 
  // Laundry ID validation (optional)
  body('laundryId')
    .optional()
    .isInt().withMessage('يجب أن يكون معرف المغسلة رقمًا صحيحًا'), // Laundry ID must be an integer
];


