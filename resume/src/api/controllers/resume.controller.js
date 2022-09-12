const ResumeCreateService = require("../../services/resume/resume-create.service");
const ResumeEditService = require("../../services/resume/resume-edit.service");
const ResumeDeleteService = require("../../services/resume/resume-delete.service");
const ResumeGetService = require("../../services/resume/resume-get.service");
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
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.put("/edit-resume/:id", UserAuth, async (req, res, next) => {
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

      const _id = req.params.id;

      const { data } = await ResumeEditService.update({
        id: _id,
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
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.delete("/delete-resume/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await ResumeDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.get("/show-user-resume/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await ResumeGetService.getByUserId(_id);
      return res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ error: err.name });
    }
  });
};
