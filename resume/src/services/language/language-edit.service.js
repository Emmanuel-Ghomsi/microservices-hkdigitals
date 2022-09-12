const { LanguageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class LanguageEdit {
  static async update(languageInputs) {
    const { id, name, level, user } = languageInputs;

    if (!id || !name || !level || !user)
      throw new ValidationError("Empty require field");

    try {
      const language = await LanguageRepository.FindLanguageByIdAndUpdate(id, {
        name,
        level,
        user,
      });
      return FormateData({ language: language });
    } catch (err) {
      throw new APIError(
        "An error occurred, the language could not be updated",
        err
      );
    }
  }
}

module.exports = LanguageEdit;
