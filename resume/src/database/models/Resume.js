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
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    hobbies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hobby",
      },
    ],
    languages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Language",
      },
    ],
    summary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("resume", ResumeSchema);
