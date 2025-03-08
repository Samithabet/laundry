import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../conf/generateToken'; // Adjust the path as needed
import prisma from '../conf/db'; // Adjust the path as needed
import { RoleName } from '../enum/role'; // Adjust the path as needed
import { BadRequest } from 'http-errors';

export const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the role for the employee
    const role = await prisma.role.findFirst({ where: { name: RoleName.EMPLOY } });
    if (!role) {
      throw new BadRequest("خطأ في الصلاحية"); // Role not found
    }

    // Hash the password
    const hashedPassword = await hashPassword(req.body.passWord);
    console.log("🚀 ~ Hashed Password:", hashedPassword); // Log the hashed password for debugging

    // Update req.body with the hashed password and role ID
    req.body = {
      ...req.body, // Preserve existing fields in req.body
      passWord: hashedPassword, // Override the plain password with the hashed one
      roleId: role.id, // Assign the role ID
    };

    // Log the updated request body for debugging
    console.log("🚀 ~ Updated req.body:", req.body);

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
};