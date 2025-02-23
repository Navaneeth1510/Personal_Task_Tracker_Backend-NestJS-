import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './schemas/tasks.schema';
import { User } from '../users/schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Tasks.name)
        private TaskModel: mongoose.Model<Tasks>
    ) { }


    // Get all tasks for a particular user
    async getTasksByUser(userId: string): Promise<Tasks[]> {
        const tasks = await this.TaskModel.find({ "user._id": userId });

        if (!tasks || tasks.length === 0) {
            throw new NotFoundException('No tasks found for this user');
        }

        return tasks;
    }


    // Add a task created by a user
    async addTask(title: string, category:string, description: string, user: User): Promise<Tasks> {
        const newTask = new this.TaskModel({
            title,
            category,
            description,
            completed: false,
            user
        });
        return await newTask.save();
    }


    // update the task ie complete flag toggling
    async toggleTaskCompletion(taskId: string): Promise<Tasks> {
        const task = await this.TaskModel.findById(taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        task.completed = !task.completed;
        return await task.save();
    }


    // task count by category
    async getTaskCountsByUser(userId: string): Promise<{ category: string; count: number }[]> {
        const taskCounts = await this.TaskModel.aggregate([
            { $match: { "user._id": new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$category", count: { $sum: 1 } } }, 
            { $project: { _id: 0, category: "$_id", count: 1 } } 
        ]);
    
        return taskCounts;
    }


    async deleteTask(userId: string, taskId: string): Promise<string> {
        try {
            const result = await this.TaskModel.deleteOne({ _id: taskId });    
            if (result.deletedCount === 0) {
                return "Task not found";
            }    
            return "Success";
        } catch (error) {
            console.error("Error deleting task:", error);
            return "Failed to delete task";
        }
    }
    
    



}
