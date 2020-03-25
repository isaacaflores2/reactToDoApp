import React from 'react';
import ToDoList from './ToDoList';
import ToDo from '../../modules/Todo'
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const emptyToDo = new ToDo(0, "Empty List")
const exampleToDo = new ToDo(1, "Example List")
exampleToDo.addItem("Test Code")

afterEach(cleanup);

test('<ToDoList/> with empty list', () =>{
    const {getByTestId, queryAllByTestId} = render(<ToDoList todo={emptyToDo}/>);

    expect(getByTestId('header').textContent).toBe('Empty List');
    //Expect items to be rendered.
    //expect(getByTestId('label').textContent).toBe('Test Label');
    expect(queryAllByTestId('list-form')).toBeTruthy();
});

test('<ToDoList/> with example list', () =>{
    const {getByTestId, queryAllByTestId, getByText} = render(<ToDoList todo={exampleToDo}/>);

    expect(getByTestId('header').textContent).toBe('Example List');
    expect(getByText('Test Code')).toBeInTheDocument();
    expect(queryAllByTestId('list-form')).toBeTruthy();
});