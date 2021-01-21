import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

describe('BlogForm Component', () => {
  test('Blog Form onSubmit triggers the createBlog function', () => {
    const mockSubmit = jest.fn();
    const component = render(<BlogForm createBlog={mockSubmit} />);
    const titleInput = component.container.querySelector('.title');
    const urlInput = component.container.querySelector('.url');
    const authorInput = component.container.querySelector('.author');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, { target: { value: 'test Blog' } });
    fireEvent.change(urlInput, { target: { value: 'url.com' } });
    fireEvent.change(authorInput, { target: { value: 'testUser' } });
    fireEvent.submit(form);

    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockSubmit.mock.calls[0][0].url).toEqual('url.com');
    expect(mockSubmit.mock.calls[0][0].title).toEqual('test Blog');
    expect(mockSubmit.mock.calls[0][0].author).toEqual('testUser');
  });
});
