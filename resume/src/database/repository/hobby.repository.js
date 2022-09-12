const { HobbyModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class HobbyRepository {
  static async CreateHobby({ user, name }) {
    try {
      const hobby = new HobbyModel({
        user,
        name,
      });
      const hobbyResult = await hobby.save();
      return hobbyResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Hobby"
      );
    }
  }

  static async FindHobbyById(id) {
    try {
      const existingHobby = await HobbyModel.findById(id);
      return existingHobby;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Hobby"
      );
    }
  }

  static async FindHobbyByIdAndUpdate(id, options) {
    try {
      const existingHobby = await HobbyModel.findByIdAndUpdate(
        id,
        options
      );
      return existingHobby;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update Hobby"
      );
    }
  }

  static async FindHobbyByIdAndDelete(id) {
    try {
      return await HobbyModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete Hobby"
      );
    }
  }

  static async FindByUserId(userId) {
    try {
      const existingHobbies = await HobbyModel.find({
        user: userId,
      });
      return existingHobbies;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Hobbies"
      );
    }
  }
}

module.exports = HobbyRepository;
