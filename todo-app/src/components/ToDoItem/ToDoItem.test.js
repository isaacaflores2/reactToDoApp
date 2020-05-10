import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToDoItem from './ToDoItem';
import '@testing-library/jest-dom/extend-expect';
import Item from '../../modules/Item';

const onRemoveItem = jest.fn();
const onChecked = jest.fn();
const item = new Item(0, 'Test Item', false);

test('<ToDoItem/>', () => {
  const { getByTestId, queryAllByTestId } = render(<ToDoItem item={item} onRemoveItem={onRemoveItem} onChecked={onChecked} />);

  expect(queryAllByTestId('checkbox')).toBeTruthy();
  expect(getByTestId('item-name').textContent).toBe('Test Item');
});

test('<ToDoItem/> change label class on check', () => {
  const { getByTestId, rerender } = render(<ToDoItem item={item} onRemoveItem={onRemoveItem} onChecked={onChecked} />);

  fireEvent.click(getByTestId('clickable-checkbox-0'));
  expect(onChecked).toBeCalledTimes(1);

  item.isChecked = true;
  rerender(<ToDoItem item={item} onRemoveItem={onRemoveItem} onChecked={onChecked} />);

  expect(getByTestId('item-name').classList.contains('item-complete')).toBe(true);

  // fireEvent.click(getByTestId('remove-icon'));
  // expect(onRemoveItem).toBeCalledTimes(1);
});
