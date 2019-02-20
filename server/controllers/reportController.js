module.exports = {
    getAllReports: (req, res) => {
        console.log('get all reports hit')
        const { id } = req.params;
        req.app
            .get("db")
            .reports.get_all_reports(id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getReports: (req, res) => {
        console.log('get reports hit')
        console.log(req.params)
        const { id } = req.params;
        req.app
            .get("db")
            .reports.get_reports(id, req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    addReport: (req, res) => {
        const { user_id, reason } = req.body;
        req.app
            .get("db")
            .reports.add_report(req.session.user.id, user_id, reason)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getReportedStatus: (req, res) => {
        const { id } = req.body;
        req.app
            .get("db")
            .reports.get_reported_status(req.session.user.id, id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
