const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.get('/articles', getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    publishedAt: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    urlToImage: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
