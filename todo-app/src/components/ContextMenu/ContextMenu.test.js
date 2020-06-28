import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContextMenu from './ContextMenu';

test('<ContextMenu> update mouse location context menu', () => {
  const { getByTestId } = render(
    <ContextMenu menu={
      ({
        mouseX, mouseY,
      }) => (
        <>
          <h1 data-testid="test-mouseX">{mouseX}</h1>
          <h1 data-testid="test-mouseY">{mouseY}</h1>
        </>
      )
      }
    >
      <h2 data-testid="test-content">context menu content</h2>
    </ContextMenu>,
  );
  const contextMenu = getByTestId('context-menu');

  fireEvent.contextMenu(contextMenu, { clientX: 20, clientY: 100 });


  const testMouseX = getByTestId('test-mouseX');
  const testMouseY = getByTestId('test-mouseY');
  const testContent = getByTestId('test-content');
  expect(testMouseX.textContent).toContain('20');
  expect(testMouseY.textContent).toContain('100');
  expect(testContent.textContent).toContain('context menu content');
});

test('<ContextMenu> close children', () => {
  const { getByTestId, getByRole, queryAllByTestId } = render(
    <div>
      <div data-testid="other-div">
        TestDiv
      </div>
      <ContextMenu menu={
      ({
        mouseX, mouseY,
      }) => (
        <>
          <h1 data-testid="test-mouseX">{mouseX}</h1>
        </>
      )
      }
      >
        <h2 data-testid="test-content">context menu content</h2>
      </ContextMenu>
    </div>,
  );

  fireEvent.click(getByTestId('other-div'));

  const testContent = getByTestId('test-content');
  expect(queryAllByTestId('test-mouseX').length).toBeFalsy();
  expect(testContent.textContent).toContain('context menu content');
});
