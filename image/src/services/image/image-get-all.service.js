const { ImageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ImageGet {
  static async getByImageableId(id) {
    if (id === null) throw new ValidationError("Empty imageable_id");

    try {
      const existingImage = await ImageRepository.FindByImageableId(id);

      if (existingImage === null) return { image: existingImage };

      if (!existingImage) throw new ValidationError("Image not found");

      return FormateData(existingImage);
    } catch (err) {
      throw new APIError(
        "An error occurred, the images could not be found",
        err
      );
    }
  }
}

module.exports = ImageGet;
