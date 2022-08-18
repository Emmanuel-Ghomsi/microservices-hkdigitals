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
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/signin", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await UserSignInService.signIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await UserGetProfileService.getProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
