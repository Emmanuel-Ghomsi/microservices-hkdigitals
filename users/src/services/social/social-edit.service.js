const { SocialRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SocialEdit {
  static async update(socialInputs) {
    const { id, name, link, user } = socialInputs;

    if (!id || !name || !link || !user)
      throw new ValidationError("Empty require field");

    try {
      const social = await SocialRepository.FindSocialByIdAndUpdate(id, {
        name,
        link,
        user,
      });
      return FormateData({ social: social });
    } catch (err) {
      throw new APIError(
        "An error occurred, the social could not be updated",
        err
      );
    }
  }
}

module.exports = SocialEdit;
