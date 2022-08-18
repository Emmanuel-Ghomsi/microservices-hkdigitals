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
      const existingResume = await ResumeModel.findById(id)
        .populate("formations")
        .populate("experiences");
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
