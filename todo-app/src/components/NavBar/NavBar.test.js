import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import ToDo from '../../modules/ToDo';
import '@testing-library/jest-dom/extend-expect';

const todos = [
  new ToDo(0, 'List One'),
  new ToDo(1, 'List Two'),
  new ToDo(2, 'List Three'),
];

const onNewList = jest.fn();
const onTodoSelect = jest.fn();
const onTodoNameChange = jest.fn();
const onRemoveList = jest.fn();

afterEach(cleanup);

test('<NavBar/>', () => {
  const { getByTestId } = render(
    <NavBar
      todos={todos}
      onNewList={onNewList}
      onTodoNameChange={onTodoNameChange}
      onTodoSelect={onTodoSelect}
      onRemoveList={onRemoveList}
      newTodoName="List Four"
    />);

  expect(getByTestId('navbar-brand').textContent).toBe('To Do');
});
