const { FormationRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class FormationGet {
  static async getByUserId(userId) {
    if (userId === null) throw new ValidationError("Empty user id");

    try {
      const existingFormations = await FormationRepository.FindByUserId(
        userId
      );

      if (!existingFormations)
        throw new ValidationError("Formations not found");

      return FormateData(existingFormations);
    } catch (err) {
      throw new APIError(
        "An error occurred, the formations could not be found",
        err
      );
    }
  }
}

module.exports = FormationGet;
