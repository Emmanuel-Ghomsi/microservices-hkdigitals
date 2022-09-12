const { SkillRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SkillEdit {
  static async update(skillInputs) {
    const { id, name, level, user } = skillInputs;

    if (!id || !name || !level || !user)
      throw new ValidationError("Empty require field");

    try {
      const skill = await SkillRepository.FindSkillByIdAndUpdate(id, {
        name,
        level,
        user,
      });
      return FormateData({ skill: skill });
    } catch (err) {
      throw new APIError(
        "An error occurred, the skill could not be updated",
        err
      );
    }
  }
}

module.exports = SkillEdit;
