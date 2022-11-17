const { ResumeRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ResumeCreate {
  static async store(resumeInputs) {
    const {
      formations,
      experiences,
      skills,
      hobbies,
      languages,
      summary,
      user,
    } = resumeInputs;

    if (!user) throw new ValidationError("Empty require field");

    try {
      const resume = await ResumeRepository.CreateResume({
        user,
        formations,
        experiences,
        skills,
        hobbies,
        languages,
        summary,
      });
      return FormateData({ resume: resume });
    } catch (err) {
      throw new APIError(
        "An error occurred, the resume could not be created",
        err
      );
    }
  }
}

module.exports = ResumeCreate;
