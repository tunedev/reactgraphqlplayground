const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  ApolloError,
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Person = require('./Models/Person');
const User = require('./Models/User');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/graphql_phonebook';

console.log('Connecting to', MONGODB_URI);
const JWT_SECRET = 'SOME_SECRET_BABY';

mongoose.set('debug', true);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Db Connected successfully');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    filterPersonsByName(name: String!): [Person]!
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!, password: String!): User!
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }
`;

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (roots, args) => {
      if (!args.phone) return Person.find({});

      return Person.find({ phone: { $exists: args.phone === 'YES' } });
    },
    findPerson: (root, args) => Person.findOne({ name: args.name }),
    filterPersonsByName: async (root, args) => {
      const persons = await Person.find({});
      return persons.filter((person) =>
        person.name.toLowerCase().includes(args.name.toLowerCase())
      );
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Person: {
    address: (root) => ({
      street: root.street,
      city: root.city,
    }),
  },
  Mutation: {
    addPerson: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated');
      }
      const personExist = await Person.findOne({ name: args.name });
      if (personExist) {
        throw new UserInputError('Already added person with name', {
          invalidArgs: args.name,
        });
      }
      const newPerson = new Person({ ...args });

      try {
        await newPerson.save();
        currentUser.friends = currentUser.friends.concat(newPerson);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPerson;
    },
    editNumber: async (root, args) => {
      const person = Person.findOne({ name: args.name });
      if (!person) {
        return null;
      }

      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
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

      let passwordMatch;

      try {
        passwordMatch = await bcrypt.compare(args.password, user.password);
      } catch (error) {
        console.log(error.message);
        throw new ApolloError('Internal Server Error');
      }

      if (!passwordMatch) {
        throw new UserInputError('Wrong login credentials');
      }
      const tokenInfo = {
        userId: user._id,
        username: user.username,
      };

      return { value: jwt.sign(tokenInfo, JWT_SECRET) };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends.map((f) => f._id).includes(person._id);

      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated');
      }

      const person = await Person.findOne({ name: args.name });
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
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
      const currentUser = await User.findById(decodedValue.userId).populate(
        'friends'
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
