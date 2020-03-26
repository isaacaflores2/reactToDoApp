import React from 'react';
import ToDoList from './ToDoList';
import ToDo from '../../modules/Todo'
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const exampleToDo = new ToDo(1, "Example List")
exampleToDo.addItem("Test Code")

const onNewItemHandle = jest.fn()

afterEach(cleanup);

test('<ToDoList/>', () =>{
    const {getByTestId, queryAllByTestId, getByText, getByPlaceholderText} = render(
        <ToDoList key={1} id={1} todo={exampleToDo} onNewItem={onNewItemHandle} />
    );

    expect(getByTestId('header').textContent).toBe('Example List');
    expect(getByText('Test Code')).toBeInTheDocument();
    expect(queryAllByTestId('list-form')).toBeTruthy();

    fireEvent.change(getByPlaceholderText('New item'),{
        target: {value: 'test item'}
    });
    fireEvent.click(getByText('Add'));
    expect(onNewItemHandle).toHaveBeenCalledTimes(1);   
});