import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from '@testing-library/react';
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});

it('renders "My Lists"', () => {
    const { getByText } = render(<App />);
    expect(getByText('My Lists')).toBeInTheDocument();
});