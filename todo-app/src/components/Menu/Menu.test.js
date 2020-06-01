import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';

const onEdit = jest.fn();
const onRemove = jest.fn();

test('<Menu> onclick handlers', () => {
  const { getByTestId } = render(<Menu onEdit={onEdit} onRemove={onRemove} />);
  const editItem = getByTestId('edit-menu-item');
  const removeItem = getByTestId('remove-menu-item');

  fireEvent.click(editItem);
  fireEvent.click(removeItem);

  expect(onEdit).toHaveBeenCalledTimes(1);
  expect(onRemove).toHaveBeenCalledTimes(1);
});
