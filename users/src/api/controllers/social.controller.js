const SocialEditService = require("../../services/social/social-edit.service");
const SocialDeleteService = require("../../services/social/social-delete.service");
const SocialCreateService = require("../../services/social/social-create.service");
const SocialGetService = require("../../services/social/social-get-all.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-social", UserAuth, async (req, res, next) => {
    try {
      const {
        name,
        link,
        user,
      } = req.body;
      const { data } = await SocialCreateService.store({
        name,
        link,
        user,
      });
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });

  app.put("/edit-social/:id", UserAuth, async (req, res, next) => {
    try {
      const {
        name,
        link,
        user,
      } = req.body;

      const _id = req.params.id;

      const { data } = await SocialEditService.update({
        id: _id,
        name,
        link,
        user,
      });
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });

  app.delete("/delete-social/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await SocialDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });

  app.get("/show-user-social/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await SocialGetService.getByUserId(_id);
      return res.status(200).json(data);
    } catch (err) {
      res
        .status(err.statusCode)
        .json({ error: err.name });
    }
  });
};
