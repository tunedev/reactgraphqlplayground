const dummy = (blog) => {
  return 1;
};

const totalLikes = (blogs, likeOrDislike = 'likes') => {
  return blogs.length > 0 ? blogs.reduce((a, b) => a + b[likeOrDislike], 0) : 0;
};

const favoriteBlogPost = (blogs) => {
  return blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );
};

const mostBlogs = (blogs) => {
  const authorsCountList = [];
  blogs.forEach((blog) => {
    const existingCount = authorsCountList.find(
      (countList) => blog.author === countList.author
    );
    if (!existingCount) {
      authorsCountList.push({ author: blog.author, count: 1 });
    } else {
      existingCount.count += 1;
    }
  });

  const result = authorsCountList.find(
    (list) =>
      list.count === Math.max(...authorsCountList.map((list) => list.count))
  );

  return { author: result.author, blogs: result.count };
};

const mostLikes = (blogs) => {
  const authorsLikeCount = [];

  blogs.forEach((blog) => {
    const existingLikeCount = authorsLikeCount.find(
      (likeCount) => likeCount.author === blog.author
    );

    if (!existingLikeCount) {
      authorsLikeCount.push({ author: blog.author, likes: blog.likes });
    } else {
      existingLikeCount.likes += blog.likes;
    }
  });

  return authorsLikeCount.find(
    (likeCount) =>
      likeCount.likes ===
      Math.max(...authorsLikeCount.map((likeCount) => likeCount.likes))
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogPost,
  mostBlogs,
  mostLikes,
};
