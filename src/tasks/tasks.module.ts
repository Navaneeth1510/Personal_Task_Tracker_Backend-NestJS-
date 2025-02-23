import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from './schemas/tasks.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }]),
    UsersModule, 
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
