const { FormationModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class FormationRepository {
  static async CreateFormation({
    user,
    degree,
    establishment,
    start_date,
    end_date,
    description,
    address,
  }) {
    try {
      const formation = new FormationModel({
        user,
        degree,
        establishment,
        start_date,
        end_date,
        description,
        address,
      });
      const formationResult = await formation.save();
      return formationResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create formation"
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
        "Unable to Find formation"
      );
    }
  }

  static async FindFormationByIdAndUpdate(id, options) {
    try {
      const existingFormation = await FormationModel.findByIdAndUpdate(
        id,
        options
      ).populate("resume");
      return existingFormation;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update formation"
      );
    }
  }

  static async FindFormationByIdAndDelete(id) {
    try {
      return await FormationModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete formation"
      );
    }
  }

  static async FindByUserId(userId) {
    try {
      const existingFormations = await FormationModel.find({
        user: userId,
      }).populate("resume");
      return existingFormations;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find formations"
      );
    }
  }
}

module.exports = FormationRepository;
