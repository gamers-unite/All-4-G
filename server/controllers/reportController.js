module.exports = {

    //gets all reports for individual user by id
    getAllReports: (req, res) => {
        const { id } = req.params;
        req.app
            .get("db")
            .reports.get_all_reports(id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    // checks to see if user on session has previously reported user on params 
    getReports: (req, res) => {
        const { id } = req.params;
        req.app
            .get("db")
            .reports.get_reports(id, req.session.user.id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    // adds a report
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

    // gets all reports for user passed in params
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
