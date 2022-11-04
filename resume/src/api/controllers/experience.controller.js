const ExperienceEditService = require("../../services/experience/experience-edit.service");
const ExperienceDeleteService = require("../../services/experience/experience-delete.service");
const ExperienceCreateService = require("../../services/experience/experience-create.service");
const ExperienceGetService = require("../../services/experience/experience-get-all.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-experience", UserAuth, async (req, res, next) => {
    try {
      const {
        role,
        company,
        start_date,
        address,
        end_date,
        description,
        user,
      } = req.body;
      const { data } = await ExperienceCreateService.store({
        role,
        company,
        start_date,
        end_date,
        description,
        address,
        user,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.put("/edit-experience/:id", UserAuth, async (req, res, next) => {
    try {
      const {
        role,
        company,
        start_date,
        address,
        end_date,
        description,
        user,
      } = req.body;

      const _id = req.params.id;

      const { data } = await ExperienceEditService.update({
        id: _id,
        role,
        company,
        start_date,
        end_date,
        description,
        address,
        user,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.delete("/delete-experience/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await ExperienceDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.get("/show-user-experience/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await ExperienceGetService.getByUserId(_id);
      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });
};
