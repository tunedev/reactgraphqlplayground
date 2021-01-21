import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('Blog component', () => {
  const testBlog = {
    id: '2hsjakafai138af',
    title: 'test blog',
    likes: 9,
    url: 'testurl.com',
    author: 'test user',
    userId: {
      id: 'sometestId',
      name: 'test user',
    },
  };

  test('Test that the details can be toggled', () => {
    const component = render(<Blog blog={testBlog} />);
    expect(component.container).toHaveTextContent(testBlog.title);
    expect(component.container).toHaveTextContent(testBlog.author);
    const detailsDiv = component.container.querySelector('.details');
    expect(detailsDiv).toHaveStyle('display: none');

    const showBtn = component.getByText('Show');
    fireEvent.click(showBtn)
    expect(detailsDiv).not.toHaveStyle('display: none');

    const hideBtn = component.getByText('Hide');
    fireEvent.click(hideBtn)
    expect(detailsDiv).toHaveStyle('display: none');
  });

  test('Clicking the button calls an event once', () => {
    const mockHandler = jest.fn();
    const component = render(
      <Blog blog={testBlog} handleBlogLike={mockHandler} />
    );

    const likeBtn = component.getByText('Like');
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
