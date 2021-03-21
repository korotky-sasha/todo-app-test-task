export interface Todo {
  id?: string;
  name: string;
  description: string;
  completed: boolean;
  favourite: boolean;
  expiryDate: Date;
}

export interface ConfirmDialogData {
  text: string;
}

export interface TodoFormDialogData {
  todo: Todo | null;
}
