const { SocialModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class SocialRepository {
  static async CreateSocial({ user, name, link }) {
    try {
      const social = new SocialModel({
        user,
        name,
        link,
      });
      const socialResult = await social.save();
      return socialResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create social"
      );
    }
  }

  static async FindSocialById(id) {
    try {
      const existingSocial = await SocialModel.findById(id);
      return existingSocial;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find social"
      );
    }
  }

  static async FindSocialByIdAndUpdate(id, options) {
    try {
      const existingSocial = await SocialModel.findByIdAndUpdate(
        id,
        options
      );
      return existingSocial;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update social"
      );
    }
  }

  static async FindSocialByIdAndDelete(id) {
    try {
      return await SocialModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete social"
      );
    }
  }

  static async FindByUserId(userId) {
    try {
      const existingSocials = await SocialModel.find({
        user: userId,
      });
      return existingSocials;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find socials"
      );
    }
  }
}

module.exports = SocialRepository;
