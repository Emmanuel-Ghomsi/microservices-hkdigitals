const { SkillRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SkillDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const skill = await SkillRepository.FindSkillByIdAndDelete(
        id
      );
      return FormateData({ skill: skill });
    } catch (err) {
      throw new APIError(
        "An error occurred, the skill could not be deleted",
        err
      );
    }
  }
}

module.exports = SkillDelete;
