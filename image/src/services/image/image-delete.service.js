const { ImageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ImageDelete {
  static async destroy(id) {
    if (!id) throw new ValidationError("Empty require field");

    try {
      const image = await ImageRepository.FindImageByIdAndDelete(id);
      return FormateData({ image: image });
    } catch (err) {
      throw new APIError(
        "An error occurred, the image could not be deleted",
        err
      );
    }
  }
}

module.exports = ImageDelete;
