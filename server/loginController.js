const sequelize = require("./database");

module.exports = {
  loginUser: (req, res) => {
    sequelize.query(`
            SELECT bab_users.user_id,  bab_users.username,  bab_users.first_name,  bab_users.last_name, bab_builds.build_id
            FROM bab_users
            JOIN bab_builds ON bab_users.user_id = bab_builds.user_id
            WHERE bab_users.username = '${req.params.username}'
            AND bab_users.password = '${req.params.password}'

        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('error logging in', err))
    },
    createAccount: (req, res) => {
        
        sequelize.query(`
            INSERT INTO bab_users (username, password, first_name, last_name)
            VALUES (${req.body.newUsername}, ${req.body.newPassword}, ${req.body.firstName}, ${req.body.lastName})
        `)
    }
};
