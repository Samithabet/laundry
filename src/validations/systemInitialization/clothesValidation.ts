const { body } = require('express-validator');
import { BadRequest } from "http-errors";
import prisma from "../../conf/db";

const allowedFields = ['laundryId', 'name', 'isDeleted'];
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

export const createClothesValidations = [
  
  body('laundryId')
    .notEmpty().withMessage('معرف المغسلة مطلوب') 
    .isInt().withMessage('يجب أن يكون معرف المغسلة رقمًا صحيحًا') 

    .custom(async (value: any) => {
      const laundry = await prisma.laundry.findUnique({ where: { id: value } });
      if (!laundry) {
        throw new BadRequest('معرف المغسلة غير صحيح'); 
      }
    }),

  body('name')
    .notEmpty().withMessage('اسم نوع القطعة يجب ان يكون موجود') 
    .isLength({ min: 3 }).withMessage('يجب أن يكون اسم المستخدم على الأقل 3 أحرف') 
    .custom(async (value: any) => {
      const nameOfClothe = await prisma.clothes.findFirst({ where: { name: value } });
      if (nameOfClothe) {
        throw new BadRequest('اسم نوع القطعة مستخدم بالفعل'); 
      }
    }),
    checkForExtraFields


];
export const updateClothesValidations = [
  
    body('laundryId')
      .optional()
      .isInt().withMessage('يجب أن يكون معرف المغسلة رقمًا صحيحًا') 
  
      .custom(async (value: any) => {
        const laundry = await prisma.laundry.findUnique({ where: { id: value } });
        if (!laundry) {
          throw new BadRequest('معرف المغسلة غير صحيح'); 
        }
      }),
  
    body('name')
     .optional()
      .isLength({ min: 3 }).withMessage('يجب أن يكون اسم المستخدم على الأقل 3 أحرف') 
      .custom(async (value: any) => {
        const nameOfClothe = await prisma.clothes.findFirst({ where: { name: value } });
        if (nameOfClothe) {
          throw new BadRequest('اسم نوع القطعة مستخدم بالفعل'); 
        }
      }),
  
  checkForExtraFields
  ];


