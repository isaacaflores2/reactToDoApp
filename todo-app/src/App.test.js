import React from 'react';
import App from './App';
import ToDo from './modules/ToDo'
import { render, cleanup, fireEvent, getByLabelText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let todos = []; 

beforeEach(() =>{
    todos = [
        new ToDo(0, "List One"),
        new ToDo(1, "List Two"),
        new ToDo(2, "List Three"),
    ];
})

afterEach(cleanup);


test('<App/> renders all components', () =>{
    const {getByTestId} = render(<App todos={todos}/>);
    
    expect(getByTestId('navbar')).toBeInTheDocument();
    expect(getByTestId('todolist-title').textContent).toBe('List One');
    expect(getByTestId('todolist-List One')).toBeInTheDocument();
});

test('<App/> renders main with first todo list', () =>{
    const {getByTestId} = render(<App todos={todos}/>);
    const todoListHeader = getByTestId('todolist-title');
    
    expect(todoListHeader).toHaveTextContent('List One');
});


test('<App/> updates main with select to do', () =>{
    const {getByTestId, getByText} = render(<App todos={todos}/>);
    const lastTodoListName = getByTestId('todo-name-dropdown').lastChild.textContent;

    fireEvent.click(getByText(lastTodoListName));

    expect(getByTestId('todolist-title')).toHaveTextContent(lastTodoListName);
});

test('<App/> updates main when item is added', () =>{
    const {getByTestId, getByText, getByPlaceholderText} = render(<App todos={todos}/>);

    fireEvent.change(getByPlaceholderText('New item'),{
        target: {value: 'test item'}
    });
    fireEvent.click(getByText('Add'));

    expect(getByTestId('todolist-List One')).toHaveTextContent('test item');
});

test('<App/> updates main when item is removed', () =>{
    todos[0].addItem('test item');
    const {getByTestId} = render(<App todos={todos}/>);
    console.log("Remove icon:" + getByTestId('remove-icon'));

    fireEvent.click(getByTestId('remove-icon'));

    expect(getByTestId('todolist-List One')).not.toHaveTextContent('test item');
});

test('<App/> click remove icon', () =>{
    const {getByTestId} = render(<App todos={todos}/>);
    
    fireEvent.click(getByTestId('list-remove-icon-0'));

    expect(todos.length).toBe(2);
    expect(getByTestId('todo-name-dropdown').children.length).toBe(2);
});

