const { HobbyRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class HobbyDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const hobby = await HobbyRepository.FindHobbyByIdAndDelete(id);
      return FormateData({ hobby: hobby });
    } catch (err) {
      throw new APIError(
        "An error occurred, the hobby could not be deleted",
        err
      );
    }
  }
}

module.exports = HobbyDelete;
