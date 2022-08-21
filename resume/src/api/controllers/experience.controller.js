const ExperienceCreateService = require("../../services/experience/experience-create.service");
const UserAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/create-experience", async (req, res, next) => {
    try {
      const {
        role,
        company,
        start_date,
        address,
        end_date,
        description,
        skills,
      } = req.body;
      const { data } = await ExperienceCreateService.store({
        role,
        company,
        start_date,
        end_date,
        description,
        skills,
        address,
      });
      return res.json(data);
    } catch (err) {
      res
        .status(err.statusCode.statusCode)
        .json({ error: err.statusCode.name });
    }
  });
};
