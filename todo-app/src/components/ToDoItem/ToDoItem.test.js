import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToDoItem from './ToDoItem';
import '@testing-library/jest-dom/extend-expect';

const onRemoveItem = jest.fn();


test('<ToDoItem/>', () => {
  const { getByTestId, queryAllByTestId } = render(<ToDoItem name="Test Item" id={0} onRemoveItem={onRemoveItem} />);

  expect(queryAllByTestId('checkbox')).toBeTruthy();
  expect(getByTestId('item-name').textContent).toBe('Test Item');
});

test('<ToDoItem/> change label class on check', () => {
  const { getByTestId } = render(<ToDoItem name="Test Item" id={0} onRemoveItem={onRemoveItem} />);

  fireEvent.click(getByTestId('clickable-checkbox-0'));
  expect(getByTestId('item-name').classList.contains('item-complete')).toBe(true);

  // fireEvent.click(getByTestId('remove-icon'));
  // expect(onRemoveItem).toBeCalledTimes(1);
});
