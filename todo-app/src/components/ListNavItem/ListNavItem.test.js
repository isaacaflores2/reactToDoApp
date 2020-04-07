import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListNavItem from './ListNavItem';
import '@testing-library/jest-dom/extend-expect';

const onRemoveList = jest.fn();
const onSelect = jest.fn();


test('<ListNavItem/>', () => {
  const { getByText, queryAllByTestId } = render(<ListNavItem name="List One" id={0} onSelect={onSelect} onRemoveList={onRemoveList} />);

  expect(getByText('List One')).toBeInTheDocument();
  // expect(queryAllByTestId('list-remove-icon-0').length).toBeTruthy();
});

test('<ListNavItem/> click item', () => {
  const { getByText } = render(<ListNavItem name="List One" id={0} onSelect={onSelect} onRemoveList={onRemoveList} />);

  fireEvent.click(getByText('List One'));

  expect(onSelect).toBeCalledTimes(1);
});

// test('<ListNavItem/> click remove icon', () => {
//   const { getByTestId } = render(<ListNavItem name="List One" id={0} onSelect={onSelect} onRemoveList={onRemoveList} />);

//   fireEvent.click(getByTestId('list-remove-icon-0'));

//   expect(onRemoveList).toBeCalledTimes(1);
// });
