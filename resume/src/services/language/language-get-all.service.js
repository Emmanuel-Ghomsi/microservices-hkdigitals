const { LanguageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class LanguageGet {
  static async getByUserId(userId) {
    if (userId === null) throw new ValidationError("Empty user id");

    try {
      const existingLanguages = await LanguageRepository.FindByUserId(userId);

      if (!existingLanguages) throw new ValidationError("languages not found");

      return FormateData(existingLanguages);
    } catch (err) {
      throw new APIError(
        "An error occurred, the languages could not be found",
        err
      );
    }
  }
}

module.exports = LanguageGet;
