const { ImageRepository } = require("../../database");
const { FormateData } = require("../../utils");
const { APIError, ValidationError } = require("../../utils/app-errors");

// All Business logic will be here
class ImageCreate {
  static async store(imageInputs) {
    const { url, imageable_id, imageable_type } = imageInputs;

    if (!url || !imageable_id || !imageable_type)
      throw new ValidationError("Empty require field");

    try {
      const image = await ImageRepository.CreateImage({
        url,
        imageable_id,
        imageable_type,
      });
      return FormateData({ image: image });
    } catch (err) {
      throw new APIError(
        "An error occurred, the image could not be created",
        err
      );
    }
  }
}

module.exports = ImageCreate;
