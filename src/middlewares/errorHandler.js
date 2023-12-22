const express = require('express')
const mongoose = require('mongoose')
const customApiErrors = require('../errors/customApiErrors')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

function errorHandler (err, req, res, next) {
    console.log(err.message);

    if (err instanceof SyntaxError && err.message.match('JSON at position')) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }

    if (err instanceof customApiErrors.CustomApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (
        err instanceof jwt.JsonWebTokenError ||
        err instanceof jwt.NotBeforeError ||
        err instanceof jwt.TokenExpiredError
    ) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid or expired token!' });
    }

    if (err instanceof mongoose.mongo.MongoServerError) {
        if (err.code === 11000) {
            err.message = `Invalid value for ${Object.keys(err.keyValue)} field. Please, try again!`;
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        }

        if (err.code === 66) {
            err.message = err.message.split(' :: caused by :: ')[1];
            return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        }
    }

    if (err instanceof mongoose.Error.ValidationError) {
        err.message = Object.values(err.errors)
            .map((error) => error.message)
            .join(', ');
        return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }

    if (err instanceof mongoose.Error.CastError) {
        err.message = `No item found with ${err.path}: ${err.value}`;
        return res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
    }

    if (err instanceof mongoose.Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '500 Internal Server DB Error' });
    }

    if (err instanceof TypeError && err.message.match('Cannot read properties of undefined')) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'You need to provide foo field as a file' });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '500 Internal Server Error' });
    next(err);
}

module.exports = errorHandler;
