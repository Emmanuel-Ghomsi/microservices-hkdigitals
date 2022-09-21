const { ImageModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ImageRepository {
  static async CreateImage({ url, imageable_id, imageable_type }) {
    try {
      const image = new ImageModel({
        url,
        imageable_id,
        imageable_type,
      });
      const imageResult = await image.save();
      return imageResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Image"
      );
    }
  }

  static async FindImageById(id) {
    try {
      const existingImage = await ImageModel.findById(id);
      return existingImage;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Image"
      );
    }
  }

  static async FindImageByIdAndUpdate(id, options) {
    try {
      const existingImage = await ImageModel.findByIdAndUpdate(id, options);
      return existingImage;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Update Image"
      );
    }
  }

  static async FindImageByIdAndDelete(id) {
    try {
      return await ImageModel.findByIdAndDelete(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find and Delete Image"
      );
    }
  }

  static async FindByImageableId(id) {
    try {
      const existingImages = await ImageModel.find({
        imageable_id: id,
      });
      return existingImages;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Images"
      );
    }
  }
}

module.exports = ImageRepository;
