import { Component } from '@angular/core';
import { Todo } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app-test-task';

  startDate = new Date();

  todoList: Todo[] = [
    {
      name: 'Todo 1',
      description: 'Description 1',
      completed: false,
      favourite: false,
      expiryDate: this.startDate,
    },
    {
      name: 'Todo 2',
      description: 'Description 2',
      completed: true,
      favourite: false,
      expiryDate: this.startDate,
    },
    {
      name: 'Todo 3',
      description: 'Description 3',
      completed: false,
      favourite: true,
      expiryDate: this.startDate,
    },
  ];
}
