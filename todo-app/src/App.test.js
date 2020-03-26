import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('<App/> renders without crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});


test('<App/> renders components', () =>{
    const {getByTestId, queryAllByTestId, getByText, getByPlaceholderText} = render(<App/>);

    expect(queryAllByTestId('navbar')).toBeTruthy()
    expect(queryAllByTestId('sidenav')).toBeTruthy()
    expect(queryAllByTestId('main')).toBeTruthy()
});
