import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { User, UpdateUser } from '../DTOs';

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
          const userData = User.parse(req.body);
    
    
          const userTestDataWithHashedPassword = {
            ...userData,
            password: await hash(userData.password, 6),
          };
    
          const userTest = await UserRepository.create(userTestDataWithHashedPassword);
    
          return res.status(201).json({ message: 'UserTest created', data: userTest });
        } catch (error) {
          return next(error);
        }
    }

      async read(req: Request, res: Response, next: NextFunction) {
        try {
          const { userId } = req.params;
    
          const user = await UserRepository.findById(userId);
    
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          return res.status(200).json({ data: user });
        } catch (error) {
          return next(error);
        }
    }

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
          const users = await UserRepository.findAll();
    
          return res.status(200).json({ data: users });
        } catch (error) {
          return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
          const { userId } = req.params;
          const userData = UpdateUser.parse(req.body);
    
          const user = await UserRepository.update(userId, userData);
    
          return res.status(200).json({ message: 'User updated', data: user });
        } catch (error) {
          return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
          const { userId } = req.params;
    
          await UserRepository.delete(userId);
    
          return res.status(200).json({ message: 'User deleted' });
        } catch (error) {
          return next(error);
        }
    }
}

export default new UserController();