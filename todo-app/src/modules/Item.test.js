import { cleanup } from '@testing-library/react';
import Item from './Item';

afterEach(cleanup);

test('ToDo', () => {
  const item = new Item(1, 'Test Item');

  expect(item.id).toBe(1);
  expect(item.name).toBe('Test Item');
  expect(item.ischecked).toBe(false);
});


test('ToDo updateIsChecked', () => {
  const item = new Item(1, 'Test Item');

  item.updateIsChecked(true);

  expect(item.ischecked).toBe(true);
});


test('ToDo fromJson', () => {
  const json = { id: 2, name: 'Test Item 2', ischecked: true };

  const item = Item.fromJson(json);

  expect(item.id).toBe(2);
  expect(item.name).toBe('Test Item 2');
  expect(item.ischecked).toBe(true);
});
