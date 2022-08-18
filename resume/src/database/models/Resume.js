const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResumeSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    formations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Formation",
      },
    ],
    experiences: [
      {
        type: Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    skills: [String],
    hobbies: [String],
    languages: {
      type: Map,
      of: String,
    },
    summary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("resume", ResumeSchema);
