const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LanguageSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    name: String,
    level: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("language", LanguageSchema);
