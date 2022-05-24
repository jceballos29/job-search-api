/** @format */

const jwt = require('jsonwebtoken');

/**
 * It takes a user object as an argument, and returns a JWT token that expires in 7 days
 * @param user - The user object that we want to generate a token for.
 * @returns A token is being returned.
 */
const generateToken = async (user) => {
  const token = await jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return token;
};

/**
 * It takes a token, and returns the decoded token if it's valid, or false if it's not
 * @param token - The token to be verified.
 * @returns The decoded token.
 */
const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};

module.exports = { generateToken, verifyToken };
