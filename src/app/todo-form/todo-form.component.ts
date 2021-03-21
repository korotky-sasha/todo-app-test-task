import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TodosStateService } from '../todos-state.service';
import { TodoFormDialogData } from '../shared/models';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  todoForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    completed: [false, Validators.required],
    favourite: [false, Validators.required],
    expiryDate: [null, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoFormDialogData,
    private formBuilder: FormBuilder,
    private todosStateService: TodosStateService
  ) {}

  ngOnInit(): void {
    if (this.data.todo) {
      const localeString = this.data.todo.expiryDate.toLocaleString(); // ex. '21.03.2021, 14:45:59'
      // The format for datetime-local input is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
      const convertedLocalTime =
        localeString.slice(6, 10) +
        '-' +
        localeString.slice(3, 5) +
        '-' +
        localeString.slice(0, 2) +
        'T' +
        localeString.slice(12, 14) +
        ':' +
        localeString.slice(15, 17);
      this.todoForm.patchValue({
        ...this.data.todo,
        expiryDate: convertedLocalTime,
      });
    }
  }

  saveForm(): void {
    const convertedExpiryDate = new Date(this.todoForm.value.expiryDate);
    const convertedResult = {
      id: this.data.todo?.id,
      ...this.todoForm.value,
      expiryDate: convertedExpiryDate,
    };
    // if we have record update it
    if (this.data.todo && this.data.todo.id) {
      this.todosStateService.updateTodo(convertedResult);
      this.dialogRef.close();
    } // else add new record
    else {
      this.todosStateService.addTodo(convertedResult);
      this.dialogRef.close();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
