const { HobbyRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class HobbyCreate {
  static async store(hobbyInputs) {
    const { name, user } = hobbyInputs;

    if (!name || !user) throw new ValidationError("Empty require field");

    try {
      const hobby = await HobbyRepository.CreateHobby({
        user,
        name,
      });
      return FormateData({ hobby: hobby });
    } catch (err) {
      throw new APIError(
        "An error occurred, the hobby could not be created",
        err
      );
    }
  }
}

module.exports = HobbyCreate;
