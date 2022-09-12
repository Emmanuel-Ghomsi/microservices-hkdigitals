const { SocialRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SocialGet {
  static async getByUserId(userId) {
    if (userId === null) throw new ValidationError("Empty user id");

    try {
      const existingSocials = await SocialRepository.FindByUserId(userId);

      if (!existingSocials) throw new ValidationError("Socials not found");

      return FormateData(existingSocials);
    } catch (err) {
      throw new APIError(
        "An error occurred, the Socials could not be found",
        err
      );
    }
  }
}

module.exports = SocialGet;
