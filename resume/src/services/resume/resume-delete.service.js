const { ResumeRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ResumeDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const resume = await ResumeRepository.FindResumeByIdAndDelete(
        id
      );
      return FormateData({ resume: resume });
    } catch (err) {
      throw new APIError(
        "An error occurred, the resume could not be deleted",
        err
      );
    }
  }
}

module.exports = ResumeDelete;
