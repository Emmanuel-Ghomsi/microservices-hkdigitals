const { FormationModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class FormationRepository {
  static async CreateFormation({
    degree,
    establishment,
    start_date,
    end_date,
    description,
  }) {
    try {
      const formation = new FormationModel({
        degree,
        establishment,
        start_date,
        end_date,
        description,
      });
      const formationResult = await formation.save();
      return formationResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Formation"
      );
    }
  }

  static async FindFormationById(id) {
    try {
      const existingFormation = await FormationModel.findById(id).populate(
        "resume"
      );
      return existingFormation;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Formation"
      );
    }
  }
}

module.exports = FormationRepository;
