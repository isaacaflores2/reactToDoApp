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
    expect(getByTestId('sidenav')).toBeInTheDocument();
    expect(getByTestId('main')).toBeInTheDocument();
});

test('<App/> renders sidenav with list names', () =>{
    const {getByTestId} = render(<App todos={todos}/>);
    const sidenav = getByTestId('sidenav');
    
    expect(sidenav).toHaveTextContent('List One');
    expect(sidenav).toHaveTextContent('List Two');
    expect(sidenav).toHaveTextContent('List Three');
});

test('<App/> renders main with first todo list', () =>{
    const {getByTestId} = render(<App todos={todos}/>);
    const todoListHeader = getByTestId('todolist-header');
    
    expect(todoListHeader).toHaveTextContent('List One');
});


test('<App/> updates main with select to do', () =>{
    const {getByTestId, getByText} = render(<App todos={todos}/>);
    const lastTodoListName = getByTestId('todo-name-list').lastChild.textContent;

    fireEvent.click(getByText(lastTodoListName));

    expect(getByTestId('todolist-header')).toHaveTextContent(lastTodoListName);
});

test('<App/> updates main when item is added', () =>{
    const {getByTestId, getByText, debug, getByPlaceholderText} = render(<App todos={todos}/>);

    fireEvent.change(getByPlaceholderText('New item'),{
        target: {value: 'test item'}
    });
    fireEvent.click(getByText('Add'));

    expect(getByTestId('todolist-List One')).toHaveTextContent('test item');
});

test('<App/> updates main when item is removed', () =>{
    todos[0].addItem('test item');
    const {getByTestId, debug} = render(<App todos={todos}/>);
    console.log("Remove icon:" + getByTestId('remove-icon'));

    fireEvent.click(getByTestId('remove-icon'));

    expect(getByTestId('todolist-List One')).not.toHaveTextContent('test item');
});


