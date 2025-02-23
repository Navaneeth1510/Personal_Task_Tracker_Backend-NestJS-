import { Body, Controller, Post, Get, Param, NotFoundException, Patch, Delete, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './schemas/tasks.schema';
import { UsersService } from '../users/users.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly usersService: UsersService
    ) { }

    // Get tasks for a particular user
    @Get('user/:userId')
    async getTasksByUser(
        @Param('userId') userId: string
    ): Promise<Tasks[]> {
        return this.tasksService.getTasksByUser(userId);
    }

    // Add a new task for a user
    @Post('add')
    async addTask(
        @Body('title') title: string,
        @Body('category') category: string,
        @Body('description') description: string,
        @Body('userId') userId: string
    ): Promise<Tasks> {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.tasksService.addTask(title, category, description, user);
    }

    @Get("categories/:userId")
    async getTaskCountsByUser(@Param("userId") userId: string) {
        return this.tasksService.getTaskCountsByUser(userId);
    }

    @Patch(':taskId/toggle-completion')
    async toggleTaskCompletion(@Param('taskId') taskId: string): Promise<Tasks> {
        return this.tasksService.toggleTaskCompletion(taskId);
    }

    @Delete(':taskId')
    async deleteTask(@Param('taskId') taskId: string,@Param('userId') userId:string) {
        return this.tasksService.deleteTask(userId, taskId);
    }
}
