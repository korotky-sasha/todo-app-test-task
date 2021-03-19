export interface Todo {
  id?: number;
  name: string;
  description: string;
  completed: boolean;
  favourite: boolean;
  expiryDate: Date;
}
