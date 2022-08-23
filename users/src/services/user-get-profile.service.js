const { UserRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, ValidationError } = require("../utils/app-errors");

// All Business logic will be here
class UserGetProfileService {
  static async getProfile(id) {
    if (id === null) throw new ValidationError("Empty user id");

    try {
      const existingUser = await UserRepository.FindUserById(id);

      if (!existingUser) throw new ValidationError("User not found");

      return FormateData(existingUser);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = UserGetProfileService;
