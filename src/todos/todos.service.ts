import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  getTodos() {
    return this.todoRepository.find();
  }

  async saveTodo(title: string) {
    const todo = await this.todoRepository.save({ title: title });

    return {
      id: todo.id,
      title: todo.title,
    };
  }

  async deleteTodo(id: number) {
    await this.todoRepository.delete(id);
    return this.getTodos();
  }
}
