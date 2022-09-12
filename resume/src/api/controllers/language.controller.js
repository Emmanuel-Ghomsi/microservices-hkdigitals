const LanguageEditService = require("../../services/language/language-edit.service");
const LanguageDeleteService = require("../../services/language/language-delete.service");
const LanguageCreateService = require("../../services/language/language-create.service");
const LanguageGetService = require("../../services/language/language-get-all.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-language", UserAuth, async (req, res, next) => {
    try {
      const { name, level, user } = req.body;
      const { data } = await LanguageCreateService.store({
        name,
        level,
        user,
      });
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.put("/edit-language/:id", UserAuth, async (req, res, next) => {
    try {
      const { name, level, user } = req.body;

      const _id = req.params.id;

      const { data } = await LanguageEditService.update({
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

  app.delete("/delete-language/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;

      const { data } = await LanguageDeleteService.destroy(_id);
      return res.json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });

  app.get("/show-user-language/:id", UserAuth, async (req, res, next) => {
    try {
      const _id = req.params.id;
      const { data } = await LanguageGetService.getByUserId(_id);
      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({ error: err.name });
    }
  });
};
