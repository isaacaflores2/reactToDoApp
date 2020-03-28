import React from 'react';
import ToDoItem from './ToDoItem';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


test('<ToDoItem/>', () =>{
    const {getByTestId, queryAllByTestId} = render(<ToDoItem name='Test Label' id={0}/>);

    expect(queryAllByTestId('checkbox')).toBeTruthy();
    expect(getByTestId('label').textContent).toBe('Test Label');
});