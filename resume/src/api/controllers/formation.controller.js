const FormationEditService = require("../../services/formation/formation-edit.service");
const FormationDeleteService = require("../../services/formation/formation-delete.service");
const FormationCreateService = require("../../services/formation/formation-create.service");
const FormationGetService = require("../../services/formation/formation-get-all.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-formation", UserAuth, async (req, res, next) => {
    try {
      const {
        degree,
        establishment,
        start_date,
        end_date,
        description,
        address,
        user,
      } = req.body;
      const { data } = await FormationCreateService.store({
        degree,
        establishment,
        start_date,
        end_date,
        description,
        address,
        user,
      });
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });

  app.put("/edit-formation/:id", UserAuth, async (req, res, next) => {
    try {
      const {
        degree,
        establishment,
        start_date,
        address,
        end_date,
        description,
        user,
      } = req.body;

      const _id = req.params.id;

      const { data } = await FormationEditService.update({
        id: _id,
        degree,
        establishment,
        start_date,
        end_date,
        description,
        address,
        user,
      });
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });

  app.delete("/delete-formation/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await FormationDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });

  app.get("/show-user-formation/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await FormationGetService.getByUserId(_id);
      return res.status(200).json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });
};
