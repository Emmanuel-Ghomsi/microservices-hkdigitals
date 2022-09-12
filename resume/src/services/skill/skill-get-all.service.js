const { SkillRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SkillGet {
  static async getByUserId(userId) {
    if (userId === null) throw new ValidationError("Empty user id");

    try {
      const existingSkills = await SkillRepository.FindByUserId(userId);

      if (!existingSkills) throw new ValidationError("skills not found");

      return FormateData(existingSkills);
    } catch (err) {
      throw new APIError(
        "An error occurred, the skills could not be found",
        err
      );
    }
  }
}

module.exports = SkillGet;
