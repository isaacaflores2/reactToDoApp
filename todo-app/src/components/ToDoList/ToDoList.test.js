import React from 'react';
import ToDoList from './ToDoList';
import ToDo from '../../modules/ToDo'
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const exampleToDo = new ToDo(1, "Example List")
exampleToDo.addItem("Test Code")

const onNewItemHandle = jest.fn();
const onRemoveItemHandle = jest.fn();

afterEach(cleanup);

test('<ToDoList/>', () =>{
    const {getByTestId, queryAllByTestId, getByText, getByPlaceholderText} = render(
        <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItemHandle} onRemoveItem={onRemoveItemHandle} />
    );

    expect(getByTestId('todolist-header').textContent).toBe('Example List');
    expect(getByText('Test Code')).toBeInTheDocument();
    expect(queryAllByTestId('list-form').length).toBeTruthy();
});


test('<ToDoList/> item added', () =>{
    const {getByText, getByPlaceholderText} = render(
        <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItemHandle} onRemoveItem={onRemoveItemHandle} />
    );

    fireEvent.change(getByPlaceholderText('New item'),{
        target: {value: 'test item'}
    });
    fireEvent.click(getByText('Add'));

    expect(onNewItemHandle).toHaveBeenCalledTimes(1);       
});

test('<ToDoList/> item removed', () =>{
    const {getByTestId, debug} = render(
        <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItemHandle} onRemoveItem={onRemoveItemHandle} />
    );

    fireEvent.click(getByTestId('remove-icon'));

    expect(onRemoveItemHandle).toBeCalledTimes(1);    
});