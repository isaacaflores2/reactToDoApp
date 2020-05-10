import React from 'react';
import {
  render, cleanup, fireEvent, wait,
} from '@testing-library/react';
import App from './App';
import ToDoService from './services/ToDoService';
import '@testing-library/jest-dom/extend-expect';

const expectedTodoJson = [{
  id: '0',
  name: 'List One',
  items: [{ id: 0, name: 'Item1', isChecked: false }, { id: 0, name: 'Item2', isChecked: true }],
}, {
  id: '1',
  name: 'List Two',
  items: [],
}, {
  id: '2',
  name: 'List Three',
  items: [],
}];

const mockResponse = { status: 200, ok: true };

ToDoService.getTodos = jest.fn();
ToDoService.getTodos.mockResolvedValue(expectedTodoJson);
ToDoService.updateTodo = jest.fn();
ToDoService.addTodo = jest.fn();
ToDoService.addTodo.mockResolvedValue(mockResponse);

afterEach(() => {
  cleanup;
  ToDoService.getTodos.mockClear();
});


test('<App/> renders all components', async () => {
  const { getByTestId } = render(<App />);

  await wait(() => expect(ToDoService.getTodos).toHaveBeenCalledTimes(1));
  expect(getByTestId('navbar')).toBeInTheDocument();
  expect(getByTestId('todolist-title').textContent).toBe('List One');
  expect(getByTestId('todolist-List One')).toBeInTheDocument();
});

test('<App/> renders main with first todo list', async () => {
  const { getByTestId } = render(<App />);
  const todoListHeader = getByTestId('todolist-title');

  await wait(() => expect(ToDoService.getTodos).toHaveBeenCalledTimes(1));
  expect(todoListHeader).toHaveTextContent('List One');
});


test('<App/> updates main with select to do', async () => {
  const { getByTestId } = render(<App />);

  await wait(() => expect(ToDoService.getTodos).toHaveBeenCalledTimes(1));
  const lastListNavItem = getByTestId('list-navitem-name-2');
  fireEvent.click(lastListNavItem);

  expect(getByTestId('todolist-title')).toHaveTextContent(lastListNavItem.textContent);
});

test('<App/> updates main when item is added', async () => {
  const { getByTestId, getByPlaceholderText } = render(<App />);

  await wait(() => expect(ToDoService.getTodos).toHaveBeenCalledTimes(1));
  fireEvent.change(getByPlaceholderText('Add New Item'), {
    target: { value: 'test item' },
  });
  fireEvent.click(getByTestId('add-icon-for-Add New Item'));

  expect(getByTestId('todolist-List One')).toHaveTextContent('test item');
});

// test('<App/> updates main when item is removed', () => {
//   todos[0].addItem('test item');
//   const { getByTestId } = render(<App todos={todos} />);
//   console.log(`Remove icon:${getByTestId('remove-icon')}`);

//   fireEvent.click(getByTestId('remove-icon'));

//   expect(getByTestId('todolist-List One')).not.toHaveTextContent('test item');
// });

// test('<App/> click remove icon', () => {
//   const { getByTestId } = render(<App todos={todos} />);

//   fireEvent.click(getByTestId('list-remove-icon-0'));

//   expect(todos.length).toBe(2);
//   expect(getByTestId('sidebar-todoname-list').children.length).toBe(2);
// });

test('<App/> add new list', async () => {
  const { getByTestId, getByPlaceholderText } = render(<App />);

  await wait(() => expect(ToDoService.getTodos).toHaveBeenCalledTimes(1));
  fireEvent.change(getByPlaceholderText('Add New List'), {
    target: { value: 'List Four' },
  });
  fireEvent.submit(getByPlaceholderText('Add New List'));

  await wait(() => expect(getByTestId('todolist-title')).toHaveTextContent('List Four'));
});
