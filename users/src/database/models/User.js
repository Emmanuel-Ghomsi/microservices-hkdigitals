const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    email_verified_at: {
      type: String,
      default: null,
    },
    password: String,
    salt: String,
    job: String,
    address: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    socials: {
      type: Map,
      of: String,
      default: null,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
