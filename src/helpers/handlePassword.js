/** @format */

require('dotenv').config();
const bcrypt = require('bcryptjs');

/**
 * EncryptPassword takes a password and returns a hash of that password.
 * @param password - The password to be encrypted.
 * @returns The hash of the password.
 */
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

/**
 * It takes a password and a hash, and returns true if the password matches the hash, and false if it
 * doesn't
 * @param password - The password that the user entered in the login form.
 * @param hash - The hashed password
 * @returns The result of the comparison of the password and the hash.
 */
const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

module.exports = {
  encryptPassword,
  comparePassword,
};
