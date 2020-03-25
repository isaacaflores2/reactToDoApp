import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


test('<NavBar/>', () =>{
    const {debug, getByTestId} = render(<NavBar/>);

    expect(getByTestId('header').textContent).toBe('To Do');
});