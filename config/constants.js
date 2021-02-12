require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE: process.env.DATABASE || 'mongodb://localhost:27017/newsexplorerdb',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret_salt',
  RESPONSE_MSG: {
    serverError: 'An error occurred on the server.',
    notFound: 'Requested resource not found.',
    notFoundArticle: 'The article was not found.',
    notFoundUser: 'The user was not found.',
    authRequired: 'Authorization required.',
    authDeleteArticle: 'Current user is not authorized to delete this article.',
    incorrectLogin: 'Incorrect email or password.',
    validEmail: 'You must provide a valid URL for the article link.',
    validUrlArticle: 'You must provide a valid URL for the article link.',
    validUrlArticleImg: 'You must provide a valid URL for the article image.',
    articleDeleted: 'The article has been deleted.',
  },
};
