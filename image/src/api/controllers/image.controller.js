const ImageEditService = require("../../services/image/image-edit.service");
const ImageDeleteService = require("../../services/image/image-delete.service");
const ImageCreateService = require("../../services/image/image-create.service");
const ImageGetService = require("../../services/image/image-get-all.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-image", UserAuth, async (req, res, next) => {
    try {
      const { url, imageable_id, imageable_type } = req.body;
      const { data } = await ImageCreateService.store({
        url,
        imageable_id,
        imageable_type,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.put("/edit-image/:id", UserAuth, async (req, res, next) => {
    try {
      const { url, imageable_id, imageable_type } = req.body;

      const _id = req.params.id;

      const { data } = await ImageEditService.update({
        id: _id,
        url,
        imageable_id,
        imageable_type,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.delete("/delete-image/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await ImageDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.get(
    "/show-image-by-imageable-id/:id",
    UserAuth,
    async (req, res, next) => {
      try {
        const _id = req.params.id;
        const { data } = await ImageGetService.getByImageableId(_id);
        return res.status(200).json(data);
      } catch (err) {
        res.status(400).json({ error: err.name });
      }
    }
  );
};
