import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SideBar from './SideBar';
import ToDo from '../../modules/ToDo';
import '@testing-library/jest-dom/extend-expect';

const todos = [
  new ToDo('0', 'List One'),
  new ToDo('1', 'List Two'),
  new ToDo('2', 'List Three'),
];

const onNewList = jest.fn();
const onTodoSelect = jest.fn();
const onTodoNameChange = jest.fn();
const onRemoveList = jest.fn();
const onToggle = jest.fn();

afterEach(cleanup);

test('<SideBar/>', () => {
  const { getByTestId } = render(
    <SideBar
      todos={todos}
      onTodoSelect={onTodoSelect}
      onNewList={onNewList}
      onRemoveList={onRemoveList}
      isCollapsed
      onToggle={onToggle}
    />);
  const sidebarTodonameList = getByTestId('sidebar-todoname-list');

  expect(sidebarTodonameList.children.length).toBe(3);
  expect(sidebarTodonameList).toHaveTextContent('List One');
});

test('<SideBar/> collapse', () => {
  const { getByTestId } = render(
    <SideBar
      todos={todos}
      onTodoSelect={onTodoSelect}
      onNewList={onNewList}
      onRemoveList={onRemoveList}
      isCollapsed
      onToggle={onToggle}
    />);
  const sidebarTodonameList = getByTestId('sidebar-todoname-list');
  const sidebarMenuButton = getByTestId('sidebar-menu-button');

  fireEvent.click(sidebarMenuButton);

  expect(onToggle).toHaveBeenCalledTimes(1);
  expect(sidebarTodonameList.children.length).toBe(3);
  expect(getByTestId('list-navitem-name-text-0').classList).toContain('d-none');
});

test('<SideBar/> select todo name', () => {
  const { getByTestId } = render(
    <SideBar
      todos={todos}
      onTodoSelect={onTodoSelect}
      onNewList={onNewList}
      onRemoveList={onRemoveList}
      isCollapsed
      onToggle={onToggle}
    />);
  const sidebarTodonameList = getByTestId('list-navitem-name-1');

  fireEvent.click(sidebarTodonameList);

  expect(onTodoSelect).toHaveBeenCalledTimes(1);
});

// test('<SideBar/> click remove icon', () => {
//   const { getByTestId } = render(
//     <SideBar
//       todos={todos}
//       onTodoSelect={onTodoSelect}
//       onNewList={onNewList}
//       onRemoveList={onRemoveList}
//       isCollapsed
//     />);

//   fireEvent.click(getByTestId('list-remove-icon-0'));

//   expect(onRemoveList).toBeCalledTimes(1);
// });
