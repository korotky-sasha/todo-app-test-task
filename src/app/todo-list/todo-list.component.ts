import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodosStateService } from '../todos-state.service';
import { INITIAL_TODOS } from '../shared/constants';
import { Todo } from '../shared/models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'description',
    'completed',
    'favourite',
    'expiryDate',
    'actions',
  ];
  dataSource: MatTableDataSource<Todo> | undefined;
  todoList$ = this.todosStateService.todos$;
  onDestroy: Subject<null> = new Subject<null>();

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private todosStateService: TodosStateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setInitialTodos();
    this.todoList$.pipe(takeUntil(this.onDestroy)).subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
    });
  }

  ngAfterViewInit(): void {
    this.todoList$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      if (this.dataSource && this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  setInitialTodos(): void {
    INITIAL_TODOS.forEach((todo) => {
      this.todosStateService.addTodo(todo);
    });
  }

  addTodo(): void {
    this.dialog.open(TodoFormComponent, {
      width: '320px',
      data: { todo: null },
    });
  }

  editTodo(todo: Todo): void {
    this.dialog.open(TodoFormComponent, {
      width: '320px',
      data: { todo },
    });
  }

  deleteTodo(id: string): void {
    this.openConfirmDialog().subscribe((result) => {
      if (result) {
        this.todosStateService.removeTodo(id);
      }
    });
  }

  openConfirmDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      data: { text: 'Are you sure you want to delete this todo record?' },
    });

    return dialogRef.afterClosed();
  }

  getDateExpiredClass(expiryDate: Date): string {
    return +expiryDate < +new Date() ? 'date-expired' : '';
  }
}
