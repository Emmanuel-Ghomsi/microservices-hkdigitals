const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    imageable_id: Schema.Types.ObjectId,
    imageable_type: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("image", ImageSchema);
