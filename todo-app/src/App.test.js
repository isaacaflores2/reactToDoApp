import React from 'react';
import {
  render, cleanup, fireEvent,
} from '@testing-library/react';
import App from './App';
import ToDo from './modules/ToDo';
import '@testing-library/jest-dom/extend-expect';

let todos = [];

beforeEach(() => {
  todos = [
    new ToDo(0, 'List One'),
    new ToDo(1, 'List Two'),
    new ToDo(2, 'List Three'),
  ];
});

afterEach(cleanup);


test('<App/> renders all components', () => {
  const { getByTestId } = render(<App todos={todos} />);

  expect(getByTestId('navbar')).toBeInTheDocument();
  expect(getByTestId('todolist-title').textContent).toBe('List One');
  expect(getByTestId('todolist-List One')).toBeInTheDocument();
});

test('<App/> renders main with first todo list', () => {
  const { getByTestId } = render(<App todos={todos} />);
  const todoListHeader = getByTestId('todolist-title');

  expect(todoListHeader).toHaveTextContent('List One');
});


test('<App/> updates main with select to do', () => {
  const { getByTestId, getByText } = render(<App todos={todos} />);
  const lastListNavItem = getByTestId('list-navitem-name-2');

  fireEvent.click(getByText(lastListNavItem.textContent));

  expect(getByTestId('todolist-title')).toHaveTextContent(lastListNavItem.textContent);
});

test('<App/> updates main when item is added', () => {
  const { getByTestId, getByText, getByPlaceholderText } = render(<App todos={todos} />);

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

test('<App/> add new list', () => {
  const { getByTestId, getByPlaceholderText } = render(<App todos={todos} />);

  fireEvent.change(getByPlaceholderText('Add New List'), {
    target: { value: 'List Four' },
  });
  fireEvent.submit(getByPlaceholderText('Add New List'));

  expect(getByTestId('todolist-title')).toHaveTextContent('List Four');
});
