import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private UserModel: mongoose.Model<User>
    ) { }

    // Get all the users 
    async findAll(): Promise<User[]> {
        const users = await this.UserModel.find();
        return users;
    }

    // Add a user so its for signup part
    async create(user: User): Promise<User> {
        const res = await this.UserModel.create(user);
        return res;
    }

    // Get the user for email and password checking so its for login part
    async findByEmailAndPassword(email: string, password: string): Promise<User> {
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (password != user.password) {
            throw new UnauthorizedException('Invalid password');
        }
        return user;
    }

    // Get user by id so its for storing tasks in tasks controller
    async findById(userId: string): Promise<User | null> {
        const user = await this.UserModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    
}
