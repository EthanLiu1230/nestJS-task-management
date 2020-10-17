// responsible for interaction with persistence layer
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}