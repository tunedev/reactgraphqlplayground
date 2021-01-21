const {
  dummy,
  totalLikes,
  favoriteBlogPost,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper');
const { blogs, emptyBlog, listWithOneBlog } = require('./testConstants');

describe('Dummy', () => {
  test('checks if the dummy returns 1', () => {
    const blog = [];
    const result = dummy(blog);
    expect(result).toBe(1);
  });
});

describe('Total Likes', () => {
  test('should return 0 for empty list', () => {
    const result = totalLikes(emptyBlog, 'likes');

    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog, 'likes');
    expect(result).toBe(listWithOneBlog[0].likes);
  });

  test('a biggerlist is calculated correctly', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('Favourite blog post', () => {
  test('confirm it returns the blog post with the highest number', () => {
    const result = favoriteBlogPost(blogs);

    expect(result).toEqual(blogs[2]);
  });
});

describe('Most Blogs', () => {
  test('confirm it returns the name of the author with the most blog', () => {
    const result = mostBlogs(blogs);

    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('Most Likes', () => {
  test('confirm it returns the details of the author with the most likes', () => {
    const result = mostLikes(blogs);

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
