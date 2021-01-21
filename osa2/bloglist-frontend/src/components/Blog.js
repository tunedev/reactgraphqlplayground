import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getSingleBlog,
  deleteBlog,
  likeBlog,
  blogComment,
} from '../reducers/blogListReducer';
import Togglable from './Togglable';
import CommentForm from './CommentForm';

const Blog = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { blog } = useSelector((state) => state.blogRelated);
  const { user } = useSelector((state) => state.userRelated);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const handleBlogLike = async (blogId) => {
    dispatch(likeBlog(blogId));
  };

  const addComment = (comment) => {
    const { body } = comment;
    dispatch(blogComment(id, body));
  };

  return blog ? (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url} target='_blank' rel='noopener noreferrer'>
        {blog.url}
      </a>
      <br />
      {blog.likes} likes{' '}
      <button
        onClick={() => {
          handleBlogLike(blog.id);
        }}
        className='like'
      >
        Like
      </button>
      <br />
      <h4>Comments</h4>
      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))
        ) : (
          <p>No comments added yet</p>
        )}
      </ul>
      <Togglable buttonLabel='Add Comment'>
        <CommentForm addComment={addComment} />
      </Togglable>
      {blog.userId && user ? (
        <div>
          {blog.userId.name}
          {blog.userId === user.user.id ? (
            <>
              <br />
              <button
                style={{
                  color: 'white',
                  background: 'red',
                  borderColor: 'red',
                  borderRadius: '4px',
                  padding: '5px 20px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (
                    window.confirm(
                      `Remove blog: ${blog.title.toUpperCase()} by ${
                        blog.author
                      }`
                    )
                  ) {
                    handleDeleteBlog(blog.id);
                  }
                }}
              >
                Remove
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : (
    <div>Loading ...</div>
  );
};

export default Blog;

// Old implementation that uses ref to toggle the view

// import React, { useRef, useState } from 'react';
// import Togglable from './Togglable';

// const Blog = ({ blog, handleBlogLike, userId, handleDeleteBlog }) => {
//   const blogDetailsRef = useRef();
//   const [visible, setVisible] = useState(false);

//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5,
//   };

//   const handleToggle = () => {
//     blogDetailsRef.current.toggleVisibility();
//     setVisible(!visible);
//   };

//   return (
//     <div className='blog' style={blogStyle}>
//       {blog.title} {blog.author}
//       <button onClick={handleToggle}>{visible ? 'Hide' : 'Show'}</button>
//       <Togglable details={true} ref={blogDetailsRef}>
//         <div>
//           {blog.url}
//           <br />
//           likes: {blog.likes}{' '}
//           <button
//             onClick={() => {
//               handleBlogLike(blog.id);
//             }}
//             className='like'
//           >
//             Like
//           </button>
//           <br />
//           {blog.userId ? (
//             <div>
//               {blog.userId.name}
//               {blog.userId.id === userId ? (
//                 <>
//                   <br />
//                   <button
//                     style={{
//                       color: 'white',
//                       background: 'red',
//                       borderColor: 'red',
//                       borderRadius: '4px',
//                       padding: '5px 20px',
//                       cursor: 'pointer',
//                     }}
//                     onClick={() => {
//                       if (
//                         window.confirm(
//                           `Remove blog: ${blog.title.toUpperCase()} by ${
//                             blog.author
//                           }`
//                         )
//                       ) {
//                         handleDeleteBlog(blog.id);
//                       }
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </>
//               ) : null}
//             </div>
//           ) : null}
//         </div>
//       </Togglable>
//     </div>
//   );
// };

// export default Blog;
