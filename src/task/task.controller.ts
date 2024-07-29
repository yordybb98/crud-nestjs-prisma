import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const taskFound = await this.taskService.getTask(+id);
    if (!taskFound) throw new NotFoundException(`Task with id ${id} not found`);
    return taskFound;
  }
  
  @Post()
  async createTask(@Body() data: CreateTaskDto) {
    return await this.taskService.createTask(data);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    try{
      return await this.taskService.updateTask(+id, data);
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try{
      return await this.taskService.deleteTask(+id);
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
