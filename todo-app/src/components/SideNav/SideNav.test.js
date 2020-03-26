import React from 'react';
import SideNav from './SideNav'
import ToDo from '../../modules/ToDo'
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const todos = [
    new ToDo(0, "List One"),
    new ToDo(1, "List Two"),
    new ToDo(2, "List Three"),
];



afterEach(cleanup);

test('<SideNav/>', () =>{
    const {queryAllByTestId, getByText} = render(<SideNav todos={todos}/>);

    expect(queryAllByTestId('todo-name-list')).toBeTruthy();
    expect(getByText('List One')).toBeInTheDocument();
    expect(getByText('List Two')).toBeInTheDocument();
    expect(getByText('List Three')).toBeInTheDocument();
});
