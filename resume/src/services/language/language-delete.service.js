const { LanguageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class LanguageDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const language = await LanguageRepository.FindLanguageByIdAndDelete(
        id
      );
      return FormateData({ language: language });
    } catch (err) {
      throw new APIError(
        "An error occurred, the language could not be deleted",
        err
      );
    }
  }
}

module.exports = LanguageDelete;
