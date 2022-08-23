const { ExperienceRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ExperienceGet {
  static async getByUserId(userId) {
    if (userId === null) throw new ValidationError("Empty user id");

    try {
      const existingExperiences = await ExperienceRepository.FindByUserId(
        userId
      );

      if (!existingExperiences)
        throw new ValidationError("Experiences not found");

      return FormateData(existingExperiences);
    } catch (err) {
      throw new APIError(
        "An error occurred, the experiences could not be found",
        err
      );
    }
  }
}

module.exports = ExperienceGet;
