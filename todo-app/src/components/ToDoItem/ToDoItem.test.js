import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToDoItem from './ToDoItem';
import '@testing-library/jest-dom/extend-expect';
import Item from '../../modules/Item';

const onRemoveItem = jest.fn();
const item = new Item(0, 'Test Item');

test('<ToDoItem/>', () => {
  const { getByTestId, queryAllByTestId } = render(<ToDoItem item={item} onRemoveItem={onRemoveItem} />);

  expect(queryAllByTestId('checkbox')).toBeTruthy();
  expect(getByTestId('item-name').textContent).toBe('Test Item');
});

test('<ToDoItem/> change label class on check', () => {
  const { getByTestId } = render(<ToDoItem item={item} onRemoveItem={onRemoveItem} />);

  fireEvent.click(getByTestId('clickable-checkbox-0'));
  expect(getByTestId('item-name').classList.contains('item-complete')).toBe(true);

  // fireEvent.click(getByTestId('remove-icon'));
  // expect(onRemoveItem).toBeCalledTimes(1);
});
