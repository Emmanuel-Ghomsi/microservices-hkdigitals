const { FormationRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class FormationEdit {
  static async update(formationInputs) {
    const {
      id,
      degree,
      establishment,
      start_date,
      address,
      end_date,
      description,
      user,
    } = formationInputs;

    if (
      !id ||
      !degree ||
      !establishment ||
      !start_date ||
      !address ||
      !description ||
      !user
    )
      throw new ValidationError("Empty require field");

    try {
      const formation = await FormationRepository.FindFormationByIdAndUpdate(
        id,
        {
          degree,
          establishment,
          start_date,
          end_date,
          address,
          description,
          user,
        }
      );
      return FormateData({ formation: formation });
    } catch (err) {
      throw new APIError(
        "An error occurred, the formation could not be updated",
        err
      );
    }
  }
}

module.exports = FormationEdit;
