import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { Todo } from '../shared/models';
import { TodosStateService } from '../todos-state.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'completed',
    'favourite',
    'expiryDate',
    'actions',
  ];
  @Input() todoList: Todo[] = [];
  // @ts-ignore
  dataSource: MatTableDataSource<Todo>;
  todoList$ = this.todosStateService.todos$;
  selectedTodo: Subject<Todo> = new Subject<Todo>();

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private todosStateService: TodosStateService) {}

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.todoList);
    this.todoList$.subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
    });
    const newTodo: Todo = {
      name: 'Test 1',
      description: 'Empty',
      completed: false,
      favourite: true,
      expiryDate: new Date(Date.now() + 3600000),
    };
    this.todosStateService.addTodo(newTodo);
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  editTodo(todo: Todo): void {
    this.selectedTodo.next(todo);
  }

  deleteTodo(id: number): void {
    this.todosStateService.removeTodo(id);
  }
}
