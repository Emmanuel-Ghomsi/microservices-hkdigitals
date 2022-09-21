const { UserRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, ValidationError } = require("../utils/app-errors");

// All Business logic will be here
class UserEdit {
  static async update(userInputs) {
    const { id, name, job, address, phone } = userInputs;

    if (!id || !name) throw new ValidationError("Empty require field");

    try {
      const user = await UserRepository.FindUserByIdAndUpdate(id, {
        name,
        job,
        address,
        phone,
      });
      return FormateData({ user: user });
    } catch (err) {
      throw new APIError(
        "An error occurred, the user could not be updated",
        err
      );
    }
  }
}

module.exports = UserEdit;
