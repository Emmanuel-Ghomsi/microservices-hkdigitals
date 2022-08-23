const { ExperienceRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ExperienceCreate {
  static async store(experienceInputs) {
    const { role, company, start_date, address, end_date, description, user } =
      experienceInputs;

    if (!role || !company || !start_date || !address || !description || !user)
      throw new ValidationError("Empty require field");

    try {
      const experience = await ExperienceRepository.CreateExperience({
        user,
        role,
        company,
        start_date,
        end_date,
        description,
        address,
      });
      return FormateData({ experience: experience });
    } catch (err) {
      throw new APIError(
        "An error occurred, the experience could not be created",
        err
      );
    }
  }
}

module.exports = ExperienceCreate;
