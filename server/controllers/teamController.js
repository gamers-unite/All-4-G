module.exports = {
    getTeams: (req, res) => {
        const { user_id } = req.body;
        req.app
            .get("db")
            .teams.get_teams(user_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    addTeam: (req, res) => {
        const { user_id, req_id } = req.body;
        req.app
            .get("db")
            .teams.add_team(user_id, req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    deleteTeam: (req, res) => {
        const { user_id, req_id } = req.body;
        req.app
            .get("db")
            .teams.delete_team(user_id, req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    deleteTeamMember: (req, res) => {
        const { user_id, req_id } = req.body;
        req.app
            .get("db")
            .teams.delete_team_member(user_id, req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getTeamMember: (req, res) => {
        const { req_id } = req.body;
        req.app
            .get("db")
            .teams.get_team_member(req.session.user.id, req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
