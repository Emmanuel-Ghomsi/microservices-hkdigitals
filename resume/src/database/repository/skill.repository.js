const { SkillModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class SkillRepository {
  static async CreateSkill({ user, name, level }) {
    try {
      const skill = new SkillModel({
        user,
        name,
        level,
      });
      const skillResult = await skill.save();
      return skillResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Skill"
      );
    }
  }

  static async FindSkillById(id) {
    try {
      const existingSkill = await SkillModel.findById(id);
      return existingSkill;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Skill"
      );
    }
  }

  static async FindSkillByIdAndUpdate(id, options) {
    try {
      const existingSkill = await SkillModel.findByIdAndUpdate(
        id,
        options
      );
      return existingSkill;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update Skill"
      );
    }
  }

  static async FindSkillByIdAndDelete(id) {
    try {
      return await SkillModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete Skill"
      );
    }
  }

  static async FindByUserId(userId) {
    try {
      const existingSkills = await SkillModel.find({
        user: userId,
      });
      return existingSkills;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Skills"
      );
    }
  }
}

module.exports = SkillRepository;
