const { UserRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
} = require("../utils");
const { APIError, ValidationError } = require("../utils/app-errors");

class UserSignUpService {
  static async signUp(userInputs) {
    const { name, email, password } = userInputs;

    if (!name || !email || !password)
      throw new ValidationError("Empty require field");

    try {
      // check if the user already exists
      const existingUser = await UserRepository.FindUser(email);
      if (existingUser) throw new Error("The user already exists");

      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const newUser = await UserRepository.CreateUser({
        name,
        email,
        password: userPassword,
        salt,
      });

      const token = await GenerateSignature({
        email: email,
        _id: newUser._id,
      });

      return FormateData({ id: newUser._id, token });
    } catch (err) {
      throw new APIError(
        "An error occurred, the user could not be created",
        err
      );
    }
  }
}

module.exports = UserSignUpService;
