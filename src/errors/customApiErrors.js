"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
  }
}
class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
  }
}
class UnauthorizedError extends CustomApiError {
  constructor(message) {
    super(message, http_status_codes_1.StatusCodes.FORBIDDEN);
  }
}
class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
  }
}
class UnprocessableEntity extends CustomApiError {
  constructor(message) {
    super(message, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
const customApiErrors = {
  CustomApiError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
  UnprocessableEntity,
};
exports.default = customApiErrors;
