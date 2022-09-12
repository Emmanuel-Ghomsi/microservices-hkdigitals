const { SocialRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SocialDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const social = await SocialRepository.FindSocialByIdAndDelete(id);
      return FormateData({ social: social });
    } catch (err) {
      throw new APIError(
        "An error occurred, the social could not be deleted",
        err
      );
    }
  }
}

module.exports = SocialDelete;
