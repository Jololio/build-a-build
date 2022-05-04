const sequelize = require('./database.js')

const userId = 1

module.exports = {
    getUserBuilds: (req, res) => {
        // userBuilds = [1,2,3] These are IDS of the builds in bab_builds, NOT item IDs
        sequelize.query(`
          
        `)
    },
    createBuild: (req, res) => {
        
    },
    editBuild: (req, res) => {

    },
    deleteBuild: (req, res) => {

    }
}