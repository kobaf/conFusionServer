const express = require('express');

const dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

dishRouter.route('/:id')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send dish with ID ' + req.params.id + ' to you!');
})
.post((req, res, next) => {
    res.end('POST operation not supported on /dishes');
})
.put((req, res, next) => {
    res.end('Will update the dish with ID: ' + req.params.id);
})
.delete((req, res, next) => {
    res.end('Deleting dish with ID ' + req.params.id);
});

module.exports = dishRouter;