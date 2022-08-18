const FormationCreateService = require("../../services/formation/formation-create.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-formation", async (req, res, next) => {
    try {
      const { degree, establishment, start_date, end_date, description } =
        req.body;
      const { data } = await FormationCreateService.store({
        degree,
        establishment,
        start_date,
        end_date,
        description,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
