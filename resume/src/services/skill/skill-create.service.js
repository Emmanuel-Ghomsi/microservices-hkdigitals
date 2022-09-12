const { SkillRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SkillCreate {
  static async store(skillInputs) {
    const { name, level, user } = skillInputs;

    if (!name || !level || !user)
      throw new ValidationError("Empty require field");

    try {
      const skill = await SkillRepository.CreateSkill({
        user,
        name,
        level,
      });
      return FormateData({ skill: skill });
    } catch (err) {
      throw new APIError(
        "An error occurred, the skill could not be created",
        err
      );
    }
  }
}

module.exports = SkillCreate;
