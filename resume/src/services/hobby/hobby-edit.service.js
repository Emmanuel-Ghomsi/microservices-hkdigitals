const { HobbyRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class HobbyEdit {
  static async update(hobbyInputs) {
    const { id, name, user } = hobbyInputs;

    if (!id || !name || !user) throw new ValidationError("Empty require field");

    try {
      const hobby = await HobbyRepository.FindHobbyByIdAndUpdate(id, {
        name,
        user,
      });
      return FormateData({ hobby: hobby });
    } catch (err) {
      throw new APIError(
        "An error occurred, the hobby could not be updated",
        err
      );
    }
  }
}

module.exports = HobbyEdit;
