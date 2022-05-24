/** @format */

const { UserModel } = require('../model');
const handlePassword = require('../helpers/handlePassword');

/* It's a class that has two methods, one to register a user and the other to login a user */
class AuthServices {
  /**
   * It takes a user object as an argument, checks if the user already exists in the database, if not,
   * it encrypts the password and saves the user to the database
   * @param user - The user object that contains the user's email and password.
   * @returns The user is being returned.
   */
  static async register(user) {
    try {
      const validateUser = await UserModel.findOne({
        email: user.email,
      });
      if (validateUser) {
        const error = new Error('El usuario ya existe.');
        error.name = 'InvalidUser';
        throw error;
      } else {
        const hashPassword = await handlePassword.encryptPassword(
          user.password
        );
        user.password = hashPassword;
        const newUser = new UserModel(user);
        await newUser.save();
        newUser.set('password', undefined, { strict: false });
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * It's a method that takes an email and a password, validates that the user exists, 
   * validates that the password is correct, and returns the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns The user is being returned.
   */
  static async login(email, password) {
    try {
      const error = new Error('Credenciales incorrectas.');
      error.name = 'InvalidUser';

      const user = await UserModel.findOne({ email });
      if (!user) throw error;

      const isPasswordValid = await handlePassword.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) throw error;
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
