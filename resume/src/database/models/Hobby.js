const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HobbbySchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hobby", HobbbySchema);
