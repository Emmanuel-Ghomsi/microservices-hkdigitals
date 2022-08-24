const { FormationRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class FormationDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const formation = await FormationRepository.FindFormationByIdAndDelete(
        id
      );
      return FormateData({ formation: formation });
    } catch (err) {
      throw new APIError(
        "An error occurred, the formation could not be deleted",
        err
      );
    }
  }
}

module.exports = FormationDelete;
