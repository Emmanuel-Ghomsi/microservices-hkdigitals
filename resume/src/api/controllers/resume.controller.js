const ResumeCreateService = require("../../services/resume/resume-create.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-resume", async (req, res, next) => {
    try {
      const {
        formations,
        experiences,
        skills,
        hobbies,
        languages,
        summary,
        user,
      } = req.body;
      const { data } = await ResumeCreateService.store({
        formations,
        experiences,
        skills,
        hobbies,
        languages,
        summary,
        user,
      });
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode.statusCode)
        .json({ error: err.statusCode.name });
    }
  });
};
