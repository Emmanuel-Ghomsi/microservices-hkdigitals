const { SocialRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class SocialCreate {
  static async store(socialInputs) {
    const { name, link, user } = socialInputs;

    if (!name || !link || !user)
      throw new ValidationError("Empty require field");

    try {
      const social = await SocialRepository.CreateSocial({
        user,
        name,
        link,
      });
      return FormateData({ social: social });
    } catch (err) {
      throw new APIError(
        "An error occurred, the social could not be created",
        err
      );
    }
  }
}

module.exports = SocialCreate;
