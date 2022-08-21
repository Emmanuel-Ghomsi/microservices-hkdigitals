const { ExperienceModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ExperienceRepository {
  static async CreateExperience({
    role,
    company,
    start_date,
    end_date,
    description,
    skills,
    address,
  }) {
    try {
      const experience = new ExperienceModel({
        role,
        company,
        start_date,
        end_date,
        description,
        skills,
        address,
      });
      const experienceResult = await experience.save();
      return experienceResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Experience"
      );
    }
  }

  static async FindExperienceById(id) {
    try {
      const existingExperience = await ExperienceModel.findById(id).populate(
        "resume"
      );
      return existingExperience;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Experience"
      );
    }
  }
}

module.exports = ExperienceRepository;
