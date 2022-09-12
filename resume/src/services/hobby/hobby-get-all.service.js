const { HobbyRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class HobbyGet {
  static async getByUserId(userId) {
    if (userId === null) throw new ValidationError("Empty user id");

    try {
      const existingHobbies = await HobbyRepository.FindByUserId(userId);

      if (!existingHobbies) throw new ValidationError("hobbies not found");

      return FormateData(existingHobbies);
    } catch (err) {
      throw new APIError(
        "An error occurred, the hobbies could not be found",
        err
      );
    }
  }
}

module.exports = HobbyGet;
