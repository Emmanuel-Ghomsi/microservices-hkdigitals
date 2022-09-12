const { LanguageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class LanguageCreate {
  static async store(languageInputs) {
    const { name, level, user } = languageInputs;

    if (!name || !level || !user)
      throw new ValidationError("Empty require field");

    try {
      const language = await LanguageRepository.CreateLanguage({
        user,
        name,
        level,
      });
      return FormateData({ language: language });
    } catch (err) {
      throw new APIError(
        "An error occurred, the language could not be created",
        err
      );
    }
  }
}

module.exports = LanguageCreate;
