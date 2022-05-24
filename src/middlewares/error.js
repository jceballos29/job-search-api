/** @format */

/**
 * It takes an error object, and returns a JSON response with the error's name and message
 * @param error - The error object that was thrown.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that you call when you're done with your middleware.
 */
const middlewareError = (error, req, res, next) => {
  res.status(400).json({
    error: {
      name: error.name,
      message: error.message,
    },
  });
};

module.exports = middlewareError;
