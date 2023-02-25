import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [];

  getTodos() {
    return this.todos;
  }

  saveTodo(title: string) {
    const id = this.todos.length;
    this.todos.push({ id: id, title: title });

    return {
      status: 'success',
      id: id,
      title: title,
    };
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos;
  }
}
