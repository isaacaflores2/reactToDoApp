import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ToDoList from './ToDoList';
import ToDo from '../../modules/ToDo';
import '@testing-library/jest-dom/extend-expect';

const exampleToDo = new ToDo(1, 'Example List');
exampleToDo.addItem('Test Code');

const onNewItem = jest.fn();
const onRemoveItem = jest.fn();
const onListUpdate = jest.fn();

afterEach(cleanup);

test('<ToDoList/>', () => {
  const { getByText, getByPlaceholderText } = render(
    <ToDoList
      key={1}
      id="1"
      todo={exampleToDo}
      onNewItem={onNewItem}
      onRemoveItem={onRemoveItem}
      onListUpdate={onListUpdate}
    />,
  );

  expect(getByText('Test Code')).toBeInTheDocument();
  expect(getByPlaceholderText('Add New Item')).toBeTruthy();
});


test('<ToDoList/> item added', () => {
  const { getByPlaceholderText, getByTestId } = render(
    <ToDoList
      key={1}
      id="1"
      todo={exampleToDo}
      onNewItem={onNewItem}
      onRemoveItem={onRemoveItem}
      onListUpdate={onListUpdate}
    />,
  );

  fireEvent.change(getByPlaceholderText('Add New Item'), {
    target: { value: 'test item' },
  });
  fireEvent.click(getByTestId('add-icon-for-Add New Item'));

  expect(onNewItem).toHaveBeenCalledTimes(1);
});

// test('<ToDoList/> item removed', () => {
//   const { getByTestId } = render(
//     <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItem} onRemoveItem={onRemoveItem} />,
//   );

//   fireEvent.click(getByTestId('remove-icon'));

//   expect(onRemoveItem).toBeCalledTimes(1);
// });
