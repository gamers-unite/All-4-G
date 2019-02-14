module.exports = {
    getReports: (req, res) => {
        const { user_id } = req.body;
        req.app
            .get("db")
            .reports.get_reports(user_id)
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
