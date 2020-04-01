import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ToDoList from './ToDoList';
import ToDo from '../../modules/ToDo';
import '@testing-library/jest-dom/extend-expect';

const exampleToDo = new ToDo(1, 'Example List');
exampleToDo.addItem('Test Code');

const onNewItem = jest.fn();
const onRemoveItem = jest.fn();

afterEach(cleanup);

test('<ToDoList/>', () => {
  const { queryAllByTestId, getByText, getByPlaceholderText } = render(
    <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItem} onRemoveItem={onRemoveItem} />,
  );

  expect(getByText('Test Code')).toBeInTheDocument();
  expect(queryAllByTestId('list-form').length).toBeTruthy();
});


test('<ToDoList/> item added', () => {
  const { getByText, getByPlaceholderText } = render(
    <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItem} onRemoveItem={onRemoveItem} />,
  );

  fireEvent.change(getByPlaceholderText('New item'), {
    target: { value: 'test item' },
  });
  fireEvent.click(getByText('Add'));

  expect(onNewItem).toHaveBeenCalledTimes(1);
});

test('<ToDoList/> item removed', () => {
  const { getByTestId } = render(
    <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItem} onRemoveItem={onRemoveItem} />,
  );

  fireEvent.click(getByTestId('remove-icon'));

  expect(onRemoveItem).toBeCalledTimes(1);
});
