import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders without crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});

test('renders "My Lists"', () => {
    const { getByText } = render(<App />);
    expect(getByText('My Lists')).toBeInTheDocument();
});