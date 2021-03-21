import { Todo } from './models';

export const INITIAL_TODOS: Todo[] = [
  {
    name: 'Test 1',
    description: 'Description 1',
    completed: false,
    favourite: true,
    expiryDate: new Date(Date.now() + 3600000),
  },
  {
    name: 'Test 2',
    description: 'Description 3',
    completed: true,
    favourite: false,
    expiryDate: new Date(Date.now() + 3600000),
  },
  {
    name: 'Test 3',
    description: 'Description 3',
    completed: false,
    favourite: false,
    expiryDate: new Date(Date.now() - 3600000),
  },
];
