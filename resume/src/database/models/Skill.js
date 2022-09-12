const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SkillSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    name: String,
    level: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("skill", SkillSchema);
