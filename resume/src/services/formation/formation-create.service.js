const { FormationRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class FormationCreate {
  static async store(formationInputs) {
    const { degree, establishment, start_date, address, end_date, description } =
      formationInputs;

    if (!degree || !establishment || !address || !start_date)
      throw new ValidationError("Empty require field");

    try {
      const formation = await FormationRepository.CreateFormation({
        degree,
        establishment,
        start_date,
        end_date,
        description,
        address
      });
      return FormateData({ formation: formation });
    } catch (err) {
      throw new APIError(
        "An error occurred, the formation could not be created",
        err
      );
    }
  }
}

module.exports = FormationCreate;
