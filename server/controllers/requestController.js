module.exports = {
    getRequestsByReqId: (req, res) => {
        const { req_id } = req.body;
        req.app
            .get("db")
            .requests.get_request_by_req_id(req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getRequestsByGameId: (req, res) => {
        req.app
            .get("db")
            .requests.get_requests_by_game_id(req.body.game_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    addRequest: (req, res) => {
        console.log(req.body);
        const { team_length, game_id, platform, info } = req.body;
        req.app
            .get("db")
            .requests.add_request(
                req.session.user.id,
                team_length,
                game_id,
                platform,
                info
            )
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    editRequest: (req, res) => {
        const { req_id, info } = req.body;
        req.app
            .get("db")
            .requests.edit_request(req_id, info)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    deleteRequest: (req, res) => {
        const { id } = req.params;
        req.app
            .get("db")
            .requests.delete_request(id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    deactivateRequest: (req, res) => {
        const { req_id } = req.body;
        req.app
            .get("db")
            .requests.deactivate_request(req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
