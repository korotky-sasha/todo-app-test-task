import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from '../shared/models';
import { TodosStateService } from '../todos-state.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    completed: [false, Validators.required],
    favourite: [false, Validators.required],
    expiryDate: [null, Validators.required],
  });
  todo: Todo | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private todosStateService: TodosStateService
  ) {}

  @Input() todo$: Observable<Todo> | undefined;
  ngOnInit(): void {
    this.todo$?.subscribe((result) => {
      this.todo = result;
      this.todoForm.patchValue({
        ...this.todo,
        expiryDate: this.todo.expiryDate.toISOString().slice(0, 16),
      });
    });
  }

  saveForm(): void {
    const convertedResult = {
      id: this.todo?.id,
      ...this.todoForm.value,
      expiryDate: new Date(this.todoForm.value.expiryDate),
    };
    // if we have record update it
    if (this.todo && this.todo.id) {
      console.log('updateTodo', convertedResult);
      this.todosStateService.updateTodo(convertedResult);
    } // else add new record
    else {
      console.log('addTodo', convertedResult);
      this.todosStateService.addTodo(convertedResult);
    }
  }
}
