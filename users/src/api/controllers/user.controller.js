const UserSignUpService = require("../../services/user-signup.service");
const UserSignInService = require("../../services/user-signin.service");
const UserGetProfileService = require("../../services/user-get-profile.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/signup", async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const { data } = await UserSignUpService.signUp({
        name,
        email,
        password,
      });
      return res.status(201).json(data);
    } catch (err) {
      res
        .status(err.statusCode.statusCode)
        .json({ error: err.statusCode.name });
    }
  });

  app.post("/signin", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await UserSignInService.signIn({ email, password });

      return res.status(200).json(data);
    } catch (err) {
      res
        .status(err.statusCode.statusCode)
        .json({ error: err.statusCode.name });
    }
  });

  app.get("/profile/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await UserGetProfileService.getProfile(_id);
      return res.status(200).json(data);
    } catch (err) {
      res
        .status(err.statusCode.statusCode)
        .json({ error: err.statusCode.name });
    }
  });
};
