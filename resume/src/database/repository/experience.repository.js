const { ExperienceModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ExperienceRepository {
  static async CreateExperience({
    user,
    role,
    company,
    start_date,
    end_date,
    description,
    address,
  }) {
    try {
      const experience = new ExperienceModel({
        user,
        role,
        company,
        start_date,
        end_date,
        description,
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

  static async FindExperienceByIdAndUpdate(id, options) {
    try {
      const existingExperience = await ExperienceModel.findByIdAndUpdate(
        id,
        options
      ).populate("resume");
      return existingExperience;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update Experience"
      );
    }
  }

  static async FindExperienceByIdAndDelete(id) {
    try {
      return await ExperienceModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete Experience"
      );
    }
  }

  static async FindByUserId(userId) {
    try {
      const existingExperiences = await ExperienceModel.find({
        user: userId,
      }).populate("resume");
      return existingExperiences;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Experiences"
      );
    }
  }
}

module.exports = ExperienceRepository;
