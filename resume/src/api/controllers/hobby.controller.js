const HobbyEditService = require("../../services/hobby/hobby-edit.service");
const HobbyDeleteService = require("../../services/hobby/hobby-delete.service");
const HobbyCreateService = require("../../services/hobby/hobby-create.service");
const HobbyGetService = require("../../services/hobby/hobby-get-all.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-hobby", UserAuth, async (req, res, next) => {
    try {
      const { name, user } = req.body;
      const { data } = await HobbyCreateService.store({
        name,
        user,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.put("/edit-hobby/:id", UserAuth, async (req, res, next) => {
    try {
      const { name, user } = req.body;

      const _id = req.params.id;

      const { data } = await HobbyEditService.update({
        id: _id,
        name,
        user,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.delete("/delete-hobby/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await HobbyDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.get("/show-user-hobby/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await HobbyGetService.getByUserId(_id);
      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });
};
