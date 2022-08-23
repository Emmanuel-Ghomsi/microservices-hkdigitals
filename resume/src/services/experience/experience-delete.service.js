const { ExperienceRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ExperienceDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const experience = await ExperienceRepository.FindExperienceByIdAndDelete(
        id
      );
      return FormateData({ experience: experience });
    } catch (err) {
      throw new APIError(
        "An error occurred, the experience could not be deleted",
        err
      );
    }
  }
}

module.exports = ExperienceDelete;
