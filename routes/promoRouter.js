const express = require('express');

const promoRouter = express.Router();

promoRouter.use(express.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:id')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send promotion with ID ' + req.params.id + ' to you!');
})
.post((req, res, next) => {
    res.end('POST operation not supported on /promotions');
})
.put((req, res, next) => {
    res.end('Will update the promotion with ID: ' + req.params.id);
})
.delete((req, res, next) => {
    res.end('Deleting promotion with ID ' + req.params.id);
});

module.exports = promoRouter;