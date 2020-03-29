import React from 'react';
import ToDoItem from './ToDoItem';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const onRemoveItemHandle = jest.fn();


test('<ToDoItem/>', () =>{
    const {getByTestId, queryAllByTestId} = render(<ToDoItem name='Test Label' id={0} onRemoveItem={onRemoveItemHandle}/>);

    expect(queryAllByTestId('checkbox')).toBeTruthy();
    expect(getByTestId('label').textContent).toBe('Test Label');
    expect(getByTestId('label').classList.contains('item-not-complete')).toBe(true);
    expect(queryAllByTestId('remove-icon').length).toBeTruthy();
});

test('<ToDoItem/> change label class on check', () =>{
    const {getByTestId} = render(<ToDoItem name='Test Label' id={0} onRemoveItem={onRemoveItemHandle} />);

    fireEvent.click(getByTestId('checkbox'));
    expect(getByTestId('label').classList.contains('item-complete')).toBe(true);

    fireEvent.click(getByTestId('checkbox'));
    expect(getByTestId('label').classList.contains('item-complete')).toBe(false);

    fireEvent.click(getByTestId('remove-icon'));
    expect(onRemoveItemHandle).toBeCalledTimes(1);
});