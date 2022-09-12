const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SocialSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    name: String,
    link: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("social", SocialSchema);
