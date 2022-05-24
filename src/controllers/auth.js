/** @format */

const AuthService = require('../services/auth');
const handleToken = require('../helpers/handleToken');

/**
 * It takes in the request body, and then calls the register function from the AuthServices file, which
 * returns a user object. If the user object is returned, then a token is created and sent back to the
 * client
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that is called when the middleware is done.
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await AuthService.register({
      name,
      email,
      password,
      role,
    });
    if (user) {
      const token = await handleToken.generateToken(user);
      res.status(201).json({
        user,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * It takes in the request body, which contains the email and password, and then it calls the login
 * function from the AuthService, which returns a user object if the user exists. If the user exists,
 * then it generates a token and sends it back to the client
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that is called when the middleware is done.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);
    if (user) {
      const token = await handleToken.generateToken(user);
      res.status(200).json({
        user,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
