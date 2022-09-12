const { LanguageModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class LanguageRepository {
  static async CreateLanguage({ user, name, level }) {
    try {
      const language = new LanguageModel({
        user,
        name,
        level,
      });
      const languageResult = await language.save();
      return languageResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Language"
      );
    }
  }

  static async FindLanguageById(id) {
    try {
      const existingLanguage = await LanguageModel.findById(id);
      return existingLanguage;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Language"
      );
    }
  }

  static async FindLanguageByIdAndUpdate(id, options) {
    try {
      const existingLanguage = await LanguageModel.findByIdAndUpdate(
        id,
        options
      );
      return existingLanguage;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update Language"
      );
    }
  }

  static async FindLanguageByIdAndDelete(id) {
    try {
      return await LanguageModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete Language"
      );
    }
  }

  static async FindByUserId(userId) {
    try {
      const existingLanguages = await LanguageModel.find({
        user: userId,
      });
      return existingLanguages;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Languages"
      );
    }
  }
}

module.exports = LanguageRepository;
