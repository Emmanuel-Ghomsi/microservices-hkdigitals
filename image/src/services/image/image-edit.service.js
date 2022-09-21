const { ImageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ImageEdit {
  static async update(imageInputs) {
    const { id, url, imageable_id, imageable_type } = imageInputs;

    if (!id || !url || !imageable_id || !imageable_type)
      throw new ValidationError("Empty require field");

    try {
      const image = await ImageRepository.FindImageByIdAndUpdate(id, {
        url,
        imageable_id,
        imageable_type,
      });
      return FormateData({ image: image });
    } catch (err) {
      throw new APIError(
        "An error occurred, the image could not be updated",
        err
      );
    }
  }
}

module.exports = ImageEdit;
