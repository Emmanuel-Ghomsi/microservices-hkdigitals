const { ResumeRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ResumeGet {
  static async getByUserId(userId) {
    if (userId === null) throw new ValidationError("Empty user id");

    try {
      const existingResume = await ResumeRepository.FindByUserId(userId);

      if (existingResume === null) return { resume: existingResume };

      if (!existingResume) throw new ValidationError("Resume not found");

      return FormateData(existingResume);
    } catch (err) {
      throw new APIError(
        "An error occurred, the resumes could not be found",
        err
      );
    }
  }
}

module.exports = ResumeGet;
