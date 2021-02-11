require('dotenv').config();

const { PORT = 3000, DATABASE = 'mongodb://localhost:27017/newsexplorerdb' } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middleware/logger');

const routes = require('./routes/index');

const errorHandler = require('./errors/errorHandler');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

const app = express();

app.use(cors());
app.options('*', cors());

app.use(limiter);

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.json());

app.use(requestLogger);

// for crash testing, remove after review
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', routes);

app.use(errorLogger);

// celebrate error handler
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
