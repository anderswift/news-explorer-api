const Article = require('../models/article');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

function getArticles(req, res, next) {
  return Article.find({}).sort({ date: -1 })
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
  return User.findById({ _id: req.user._id })
    .then((owner) => {
      Article.create({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        owner,
      })
        .then((article) => {
          res.status(201).send(article);
        })
        .catch(next);
    })
    .catch(next);
}

function deleteArticle(req, res, next) {
  return Article.findById({ _id: req.params.articleId }).select('+owner')
    .then((article) => {
      if (!article) throw new NotFoundError('The article was not found');
      else if (!article.owner.equals(req.user._id)) throw new UnauthorizedError('Current user is not authorized to delete this article');
      else {
        Article.findByIdAndDelete({ _id: req.params.articleId })
          .then(() => {
            res.status(200).send({ message: 'This article has been deleted' });
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
