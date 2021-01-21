const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require('Apollo-server');
const Book = require('./Models/Book');
const Author = require('./Models/Author');
const User = require('./Models/LibraryUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/graphql_library';
const JWT_SECRET = 'SOME_DEEP_SECRET';

mongoose.set('debug', true);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log('error connecting to Mongodb: ', error.message);
  });

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963,
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821,
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//   },
// ];

/*
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * For simplicity, however, we will store the author's name with the book
 */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['Agile', 'patterns', 'design'],
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns'],
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design'],
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime'],
//   },
//   {
//     title: 'The Demon',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'Revolution'],
//   },
// ];

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthorBornYear(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User!
    login(username: String!, password: String!): Token!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({});

      if (!args.genre && !args.author) {
        return books;
      } else if (args.genre && !args.author) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else if (args.author && !args.genre) {
        return books.filter((book) => book.author === args.author);
      } else {
        return books
          .filter((book) => book.genres.includes(args.genre))
          .filter((book) => book.author === args.author);
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books');
      console.log('All authors re jarey my dear', authors);
      authors.map((author) => ({
        ...author,
        bookCount: author.books.length,
      }));
      return authors;
    },
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated');
      }

      // Check if new books author is saved in the system yet
      let author = await Author.findOne({ name: args.author });

      console.log(author);

      if (!author) {
        author = new Author({ name: args.author });
      }
      let book = new Book({ ...args });
      book.author = author;
      author.books = author.books.concat(book._id);
      try {
        await author.save();
        await (await book.save()).execPopulate('author');
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book;
    },
    editAuthorBornYear: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated');
      }

      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.serBornTo },
          { new: true }
        );

        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args) => {
      args.password = await bcrypt.hash(args.password, 10);

      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new AuthenticationError('Invalid Authentication');
      }

      let confirmPassword;

      try {
        confirmPassword = await bcrypt.compare(args.password, user.password);
      } catch (error) {
        console.log(error.message);
        throw new ApolloError('Internal server error');
      }

      if (!confirmPassword) {
        throw new AuthenticationError('Invalid Authentication');
      }

      const userDetails = {
        userId: user._id,
        username: user.username,
      };

      return { value: jwt.sign(userDetails, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedValue = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedValue.userId);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
