# News Explorer Back End API
Access full site online at https://newsexplorer.anderswift.com, API at https://api.newsexplorer.anderswift.com

### Project Description:
An API for the backend functionality of the News Explorer project from the Practicum Web Development course. The application is built with Node.js, using Express and MongoDB. This project incorporates:

* Back end routing with Express
* MongoDB data storage using Mongoose models
* JWT authorization tokens generated on user login
* Data validation with Celebrate and Joi


### API Endpoints 
This API provides endpoints for user signup and login, as well as those for fetching, saving and deleting articles and retrieving account information for authorized users (requiring an authorization header with token).

##### creates a user with the passed email, password, and name in the body
POST /signup

##### checks the email and password passed in the body and returns a JWT
POST /signin 

##### returns information about the logged-in user (email and name)
GET /users/me

##### returns all articles saved by the user
GET /articles

##### creates an article with the passed keyword, title, description, publishedAt, source, url, and urlToImage in the body
POST /articles

##### deletes the stored article by _id
DELETE /articles/:articleId 
