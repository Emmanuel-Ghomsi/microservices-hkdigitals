const { ResumeModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ResumeRepository {
  static async CreateResume({
    user,
    formations,
    experiences,
    skills,
    hobbies,
    languages,
    summary,
  }) {
    try {
      const resume = new ResumeModel({
        user,
        formations,
        experiences,
        skills,
        hobbies,
        languages,
        summary,
      });
      const resumeResult = await resume.save();
      return resumeResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Resume"
      );
    }
  }

  static async FindResumeById(id) {
    try {
      const existingResume = await ResumeModel.findById(id);
      return existingResume;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Resume"
      );
    }
  }

  static async FindResumeByIdAndUpdate(id, options) {
    try {
      const existingResume = await ResumeModel.findByIdAndUpdate(
        id,
        options
      );
      return existingResume;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update Resume"
      );
    }
  }

  static async FindResumeByIdAndDelete(id) {
    try {
      return await ResumeModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete Resume"
      );
    }
  }

  static async FindByUserId(userId) {
    try {
      const existingResume = await ResumeModel.findOne({
        user: userId,
      });
      return existingResume;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Resume"
      );
    }
  }
}

module.exports = ResumeRepository;
