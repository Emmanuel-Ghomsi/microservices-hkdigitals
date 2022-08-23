// database related modules
module.exports = {
  databaseConnection: require("./connection"),
  ResumeRepository: require("./repository/resume.repository"),
  FormationRepository: require("./repository/formation.repository"),
  ExperienceRepository: require("./repository/experience.repository"),
};
