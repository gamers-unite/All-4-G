module.exports = {
    currentSession: (req, res, next) => {
        if (!req.session) {
            res.status(401).json("Please log in");
        } else {
            next();
        }
    }
};
