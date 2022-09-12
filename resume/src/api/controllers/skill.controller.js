const SkillEditService = require("../../services/skill/skill-edit.service");
const SkillDeleteService = require("../../services/skill/skill-delete.service");
const SkillCreateService = require("../../services/skill/skill-create.service");
const SkillGetService = require("../../services/skill/skill-get-all.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-skill", UserAuth, async (req, res, next) => {
    try {
      const { name, level, user } = req.body;
      const { data } = await SkillCreateService.store({
        name,
        level,
        user,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.put("/edit-skill/:id", UserAuth, async (req, res, next) => {
    try {
      const { name, level, user } = req.body;

      const _id = req.params.id;

      const { data } = await SkillEditService.update({
        id: _id,
        name,
        level,
        user,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.delete("/delete-skill/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await SkillDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.get("/show-user-skill/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await SkillGetService.getByUserId(_id);
      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });
};
