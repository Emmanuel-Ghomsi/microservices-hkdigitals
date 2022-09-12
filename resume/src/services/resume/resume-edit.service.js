const { ResumeRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ResumeEdit {
  static async update(resumeInputs) {
    const {
      id,
      formations,
      experiences,
      skills,
      hobbies,
      languages,
      summary,
      user,
    } = resumeInputs;

    if (
      !id ||
      !formations ||
      !experiences ||
      !skills ||
      !hobbies ||
      !languages ||
      !summary ||
      !user
    )
      throw new ValidationError("Empty require field");

    try {
      const resume = await ResumeRepository.FindResumeByIdAndUpdate(id, {
        formations,
        experiences,
        skills,
        hobbies,
        languages,
        summary,
        user,
      });
      return FormateData({ resume: resume });
    } catch (err) {
      throw new APIError(
        "An error occurred, the Resume could not be updated",
        err
      );
    }
  }
}

module.exports = ResumeEdit;
