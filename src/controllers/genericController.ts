import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import GenericService from "../services/genericService"; // Adjust the import path as needed
import { BadRequest,  } from "http-errors";

class GenericController<T> {
    private service: GenericService<T>;

    constructor(service: GenericService<T>) {
        this.service = service;
    }

    // Get all items (with optional pagination)
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("here");
            
            const filterData = req.query; // Extract query parameters
            const result = await this.service.getAll(filterData);
            res.status(200).json(result);
        } catch (error) {
            next(error); // Pass errors to the error-handling middleware
        }
    }

    // Get an item by ID
    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = +req.params.id; // Extract ID from URL params
            const result = await this.service.getById(id);
            if (!result) {
                throw new BadRequest("هذا العنصر غير موجود");
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    // Create a new item
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = req.body; // Extract data from request body
            console.log("🚀 ~ GenericController<T> ~ create ~ data:", data)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequest(errors.array()[0].msg);
            }
            const result = await this.service.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    // Update an item by ID
    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = +req.params.id; // Extract ID from URL params
            const data = req.body; // Extract data from request body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequest(errors.array()[0].msg);
            }
            const result = await this.service.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    // Delete an item by ID (soft delete)
    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = +req.params.id; // Extract ID from URL params
            const result = await this.service.delete(id);
            res.status(200).json({ message: result });
        } catch (error) {
            next(error);
        }
    }
}

export default GenericController;