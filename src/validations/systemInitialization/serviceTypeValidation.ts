const { body } = require('express-validator');
import { BadRequest } from "http-errors";
import prisma from "../../conf/db";



export const createServiceTypeValidations = [
  
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
    .notEmpty().withMessage('اسم نوع الخدمة يجب ان يكون موجود') 
    .isLength({ min: 3 }).withMessage('يجب أن يكون اسم نوع الخدنة الأقل 3 أحرف') 
    .custom(async (value: any) => {
      const serviceType = await prisma.serviceType.findFirst({ where: { name: value } });
      if (serviceType) {
        throw new BadRequest('اسم نوع الخدمة مستخدم بالفعل'); 
      }
    }),


];
export const updateServiceTypeValidations = [
  
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
   .isLength({ min: 3 }).withMessage('يجب أن يكون اسم نوع الخدنة الأقل 3 أحرف') 
   .custom(async (value: any) => {
        const serviceType = await prisma.serviceType.findFirst({ where: { name: value } });
        if (serviceType) {
          throw new BadRequest('اسم نوع الخدمة مستخدم بالفعل'); 
        }
      }),
  
  ];


