#Using Node.js: express, cors, morgan, multer, json, router

##Get, Post, Put, Delete

Restful Stateless API for an entity called `students` as following:

const students = [{ id: 1, name: "Ali Ahmadi", course: "Modern Web", picture: "1570418198494.jpg", grade: 100 }]

* Students entity is an immutable data structure.
* Routes for the following CRUD operations that use the proper HTTP verbs (`GET` one and all, `POST`, and `DELETE`).
* Used  `HTTP Client` extension for VSCode.
* API accepts and returns `JSON` data.
* Logs all requests to a file `log.txt` using `morgan` middleware. 
* For `POST` route, assigns a middleware to upload the student's picture into a directory `./assets/pics`, only `.jpg` files is accepted and picture size should not exceed `3 MB`, files renamed to represent Unix timestamps.
* For `POST` route, assigns a custom middleware to verify if a user passes a `JSON` object that contains `id`, `name`, `course` and `grade`, otherwise send back an error.
* Defines a middleware to serve all static images of `./picture/*` from `./assets/pics/*`.
* Accept all cross-domain XHR requests using `cors` middleware.  
  

