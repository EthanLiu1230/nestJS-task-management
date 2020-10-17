// responsible for interaction with persistence layer
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { description, title } = createTaskDto;

    const task = new Task();
    Object.assign(task, {
      title, description,
      status: TaskStatus.OPEN,
    });
    // task is an Entity Object, commit change to db
    await task.save();

    return task;
  }
}