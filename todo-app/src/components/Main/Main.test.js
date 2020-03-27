import React from 'react';
import Main from './Main';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

test('<Main/>', () =>{
    const {queryAllByTestId, getByText} = render(
    <Main>
        <h1>Test One</h1>
        <h1>Test Two</h1>
    </Main>);

    expect(queryAllByTestId('main')).toBeTruthy();
    expect(getByText('Test One')).toBeInTheDocument();
    expect(getByText('Test Two')).toBeInTheDocument();
});
