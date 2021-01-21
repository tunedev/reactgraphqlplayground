import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 20,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
      <br />
    </div>
  );
};

const Blogs = () => {
  const { blogs } = useSelector((state) => state.blogRelated);

  return blogs.length === 0 ? (
    <div>
      <h1>The blog list is empty at the moment</h1>
    </div>
  ) : (
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })
  );
};

export default Blogs;
