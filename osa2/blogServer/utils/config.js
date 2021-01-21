require('dotenv').config();

const PORT = process.env.PORT || 3003;

let mongoUri = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'test') {
  mongoUri = process.env.TEST_DATABASE_URL;
} else if (process.env.NODE_ENV === 'production') {
  mongoUri = process.env.DATABASE_URL_PROD;
}
module.exports = {
  PORT,
  mongoUri,
};
