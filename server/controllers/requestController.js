module.exports = {
    getRequest: (req, res) => {
        const { req_id } = req.body;
        req.app
            .get("db")
            .requests.get_request(req_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getRequests: (req, res) => {
        const { game_id } = req.body;
        req.app
            .get("db")
            .requests.get_requests(game_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    addRequest: (req, res) => {
        const { game_id, info } = req.body;
        req.app
            .get("db")
            .requests.add_request(req.session.user.id, game_id, info)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    editRequest: (req, res) => {
        const { req_id } = req.body;
        req.app
            .get("db")
            .requests.edit_request(req_id, info)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    deleteRequest: (req, res) => {
        const { req_id } = req.body;
        req.app
            .get("db")
            .requests.delete_request(req_id, info)
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
