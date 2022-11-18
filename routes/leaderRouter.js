const express = require('express');

const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(express.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

leaderRouter.route('/:id')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send leader with ID ' + req.params.id + ' to you!');
})
.post((req, res, next) => {
    res.end('POST operation not supported on /leaders');
})
.put((req, res, next) => {
    res.end('Will update the leader with ID: ' + req.params.id);
})
.delete((req, res, next) => {
    res.end('Deleting leader with ID ' + req.params.id);
});

module.exports = leaderRouter;