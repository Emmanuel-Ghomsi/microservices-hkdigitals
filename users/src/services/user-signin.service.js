const { UserRepository } = require("../database");
const {
  FormateData,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const { APIError, ValidationError } = require("../utils/app-errors");

class UserSignInService {
  static async signIn(userInputs) {
    const { email, password } = userInputs;

    if (!email || !password) throw new ValidationError("Empty require field");

    try {
      const existingUser = await UserRepository.FindUser(email);

      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password
        );

        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
          });
          return FormateData({ id: existingUser._id, token });
        } else throw new ValidationError("Password is incorrect");
      } else throw new ValidationError("User doesn't exist");
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = UserSignInService;
