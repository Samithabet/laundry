import { Users } from "@prisma/client";
declare module 'express' {
    export interface Request {
        user?: Users;
    }
}