import { cleanup } from '@testing-library/react';
import ToDo from './ToDo';
import Item from './Item';

afterEach(cleanup);

test('ToDo', () => {
  const todo = new ToDo(1, 'Test ToDo');

  todo.addItem('test item');

  expect(todo.id).toBe(1);
  expect(todo.name).toBe('Test ToDo');
});


test('ToDo addItem', () => {
  const todo = new ToDo(1, 'Test ToDo');

  todo.addItem('test item');

  expect(todo.items.length).toBe(1);
  expect(todo.items[0].name).toBe('test item');
});


test('ToDo removeItem', () => {
  const todo = new ToDo(1, 'Test ToDo');

  todo.addItem('test item');
  todo.removeItem(0);

  expect(todo.items.length).toBe(0);
});

test('ToDo fromJson', () => {
  const json = {
    id: 2,
    name: 'Test ToDo 2',
    items: [
      {
        id: 0,
        name: 'Test Item 1',
        isChecked: false,
      },
      {
        id: 1,
        name: 'Test Item 2',
        isChecked: true,
      },
    ],
  };


  const todo = ToDo.fromJson(json);

  expect(todo.id).toBe(2);
  expect(todo.name).toBe('Test ToDo 2');
  expect(todo.items.length).toBe(2);
  expect(todo.items[0]).toBeInstanceOf(Item);
  expect(todo.items[0].name).toBe('Test Item 1');
});
