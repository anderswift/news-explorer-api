const Article = require('../models/article');
const { RESPONSE_MSG } = require('../config/constants');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

function getArticles(req, res, next) {
  return Article.find({ owner: req.user._id }).sort({ date: -1 })
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
}

function createArticle(req, res, next) {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  return Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send(article);
    })
    .catch(next);
}

function deleteArticle(req, res, next) {
  return Article.findById({ _id: req.params.articleId }).select('+owner')
    .then((article) => {
      if (!article) throw new NotFoundError(RESPONSE_MSG.notFoundArticle);
      else if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(RESPONSE_MSG.authDeleteArticle);
      } else {
        Article.findByIdAndDelete({ _id: req.params.articleId })
          .then(() => {
            res.status(200).send({ message: RESPONSE_MSG.articleDeleted });
          })
          .catch(next);
      }
    })
    .catch(next);
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
