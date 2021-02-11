const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT, DATABASE } = require('./config/environment');
const { limiter } = require('./config/limiter');

const routes = require('./routes/index');

const errorHandler = require('./errors/errorHandler');

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
