import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
    // nest.js will do jsonify etc. to translate it into http-response
  }

  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // @Body('key') will parse request.body, extract value from json by key,
  // and convert according to type hint
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
