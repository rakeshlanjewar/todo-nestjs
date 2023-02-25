import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get('/')
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post('/')
  saveTodo(@Body() body: Partial<Todo>) {
    return this.todoService.saveTodo(body.title);
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
