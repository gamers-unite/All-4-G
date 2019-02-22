module.exports = {

    // gets user team history
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
        const { req_id } = req.body;
        req.app
            .get("db")
            .requests.deactivate_request(req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    // allows owner of team to remove specific player from team
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
    },

    // returns count of teams user has participated in
    getUserTeamCount: (req, res) => {
        const { id } = req.params;
        req.app.get('db').teams.user_team_count(id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    // returns count of teams user has participated in by game
    getUserGameCount: (req, res) => {
        const { id } = req.params;
        req.app.get('db').teams.user_game_count(id)
            .then(response => {
                const data = response[0]
                const gameArr = [+data.leagueoflegends, +data.smite, +data.diablo3, +data.destiny2, +data.overwatch];
                res.status(200).json(gameArr);
            })
            .catch(err => console.log(err));
    },
};
