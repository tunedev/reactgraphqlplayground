import React from 'react';
import Togglable from './Togglable';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

describe('Togglable component', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='OpenUp'>
        <div className='test-div'>Test Div</div>
      </Togglable>
    );
  });

  test('renders children', () => {
    expect(component.container.querySelector('.test-div')).toBeDefined();
  });

  test('at the start the children are not visible', () => {
    const togglableContent = component.container.querySelector(
      '.togglableContent'
    );

    expect(togglableContent).toHaveStyle('display: none');
  });

  test('children should display after button click', () => {
    const openUpButton = component.getByText('OpenUp');
    fireEvent.click(openUpButton);

    const togglableContent = component.container.querySelector(
      '.togglableContent'
    );

    expect(togglableContent).not.toHaveStyle('display: none');
  });

  test('children can be closed using the cancel button', () => {
    const openUpButton = component.getByText('OpenUp');
    fireEvent.click(openUpButton);

    const cancelBtn = component.getByText('Cancel');
    fireEvent.click(cancelBtn);

    const togglableContent = component.container.querySelector(
      '.togglableContent'
    );

    expect(togglableContent).toHaveStyle('display: none');
  });
});
