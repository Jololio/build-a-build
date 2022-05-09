const sequelize = require("./database.js");

const userId = 1;

module.exports = {
  getUserBuilds: (req, res) => {
    // userBuilds = [1,2,3] These are IDS of the builds in bab_builds, NOT item IDs
    sequelize
      .query(
        `
          SELECT * 
          FROM bab_builds
          JOIN bab_champions ON bab_champions.champion_id = bab_builds.champion_id
          WHERE user_id = 1
        `
      )
      .then((dbRes) => {
          res.status(200).send(dbRes[0])
      });
  },
  createBuild: (req, res) => {},
  editBuild: (req, res) => {},
  deleteBuild: (req, res) => {},
};
