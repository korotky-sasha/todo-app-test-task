import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Todo } from './shared/models';

@Injectable({
  providedIn: 'root',
})
export class TodosStateService {
  // tslint:disable-next-line:variable-name
  private readonly _todos = new BehaviorSubject<Todo[]>([]);

  readonly todos$ = this._todos.asObservable();

  private get todos(): Todo[] {
    return this._todos.getValue();
  }

  private set todos(val: Todo[]) {
    this._todos.next(val);
  }

  addTodo(newTodo: Todo): void {
    this.todos = [
      ...this.todos,
      {
        id: this.todos.length + 1,
        name: newTodo.name,
        description: newTodo.description,
        completed: newTodo.completed,
        favourite: newTodo.favourite,
        expiryDate: newTodo.expiryDate,
      },
    ];
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  updateTodo(updatedTodo: Todo): void {
    const id = updatedTodo.id;
    const todo: Todo | undefined = this.todos.find(
      (todoFromTodos) => todoFromTodos.id === id
    );

    if (todo) {
      const index = this.todos.indexOf(todo);
      this.todos[index] = {
        ...todo,
        ...updatedTodo,
      };
      this.todos = [...this.todos];
    }
  }
}
