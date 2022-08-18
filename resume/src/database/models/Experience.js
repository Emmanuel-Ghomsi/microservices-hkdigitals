const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExperienceSchema = new Schema(
  {
    role: String,
    company: String,
    start_date: Date,
    end_date: {
      type: Date,
      default: null,
    },
    description: String,
    skills: [
      {
        type: String,
        default: null,
      },
    ],
    resume: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("experience", ExperienceSchema);
