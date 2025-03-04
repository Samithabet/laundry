const { body } = require('express-validator');
import { BadRequest } from "http-errors";
import prisma from "../../conf/db";



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
  
  
  ];


