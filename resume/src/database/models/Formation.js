const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FormationSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    degree: String,
    establishment: String,
    start_date: Date,
    end_date: {
      type: Date,
      default: null,
    },
    description: String,
    address: String,
    resume: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("formation", FormationSchema);
