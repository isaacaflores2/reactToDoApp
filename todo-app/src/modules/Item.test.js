import { cleanup } from '@testing-library/react';
import Item from './Item';

afterEach(cleanup);

test('Item', () => {
  const item = new Item(1, 'Test Item', false);

  expect(item.id).toBe(1);
  expect(item.name).toBe('Test Item');
  expect(item.isChecked).toBe(false);
});


test('Item updateIsChecked', () => {
  const item = new Item(1, 'Test Item', false);

  item.updateIsChecked(true);

  expect(item.isChecked).toBe(true);
});


test('Item fromJson', () => {
  const json = { id: 2, name: 'Test Item 2', ischecked: true };

  const item = Item.fromJson(json);

  expect(item.id).toBe(2);
  expect(item.name).toBe('Test Item 2');
  expect(item.isChecked).toBe(true);
});
