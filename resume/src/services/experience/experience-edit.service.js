const { ExperienceRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ExperienceEdit {
  static async update(experienceInputs) {
    const {
      id,
      role,
      company,
      start_date,
      address,
      end_date,
      description,
      user,
    } = experienceInputs;

    if (
      !id ||
      !role ||
      !company ||
      !start_date ||
      !address ||
      !description ||
      !user
    )
      throw new ValidationError("Empty require field");

    try {
      const experience = await ExperienceRepository.FindExperienceByIdAndUpdate(
        id,
        {
          role,
          company,
          start_date,
          end_date,
          address,
          description,
          user,
        }
      );
      return FormateData({ experience: experience });
    } catch (err) {
      throw new APIError(
        "An error occurred, the experience could not be updated",
        err
      );
    }
  }
}

module.exports = ExperienceEdit;
