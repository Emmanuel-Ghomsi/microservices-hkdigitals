const { UserModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class UserRepository {
  static async CreateUser({ name, email, password, salt }) {
    try {
      const user = new UserModel({
        name,
        email,
        password,
        salt,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create User"
      );
    }
  }

  static async FindUser(email) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      return existingUser;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  static async FindUserByIdAndUpdate(id, options) {
    try {
      const existingUser = await UserModel.findByIdAndUpdate(id, options);
      return existingUser;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update user"
      );
    }
  }

  static async FindUserById(id) {
    try {
      const existingUser = await UserModel.findById(id);
      return existingUser;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }
}

module.exports = UserRepository;
