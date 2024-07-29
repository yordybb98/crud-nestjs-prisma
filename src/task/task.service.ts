import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {

  constructor(private prisma: PrismaService) {}

  createTask(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTask(id: number): Promise<Task> {
    return await this.prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    return await this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: number): Promise<Task> {
    return await this.prisma.task.delete({ where: { id } });
  }
}
